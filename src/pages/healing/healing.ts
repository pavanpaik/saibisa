import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { FlamelinkService } from '../../app/shared/services/flamelink.service';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
import { SplashScreen } from '@ionic-native/splash-screen';

@IonicPage()
@Component({
  selector: 'page-healing',
  templateUrl: 'healing.html',
})
export class HealingPage {
  title: string = 'Healing';
  heroImage: string;

  selectedPage: string = "tab1";

  healingTab1Title: string = "Tab 1";
  healingTab2Title: string = "Tab 2";

  healingPlaylistId: string = "play";


  healingChild1: any;
  healingChild2: any;
  healingChild3: any;
  healingChild4: any;

  map: any = {
    'tab1': { title: 'We Heal', icon: 'fa-book', component: 'ArticlePage', params: { articleId: '1538910075447' }  },
    'tab2': { title: 'Watch Healing', icon: 'fa-video-camera', component: 'YoutubePage', params: {playlistId: 'PLPzS0mASgDd5jMOYUclVhHOytoQPZWZv8'}  },
    'tab3': { title: 'Testimonial', icon: 'fa-book', component: 'ArticlePage', params: { articleId: '1538910075447' }  },
  };
  // map: any = {
  //   'tab1': { title: 'tab1', icon: 'fa-book', component: ArticleComponent, params: {postId: 993}, postListId: 0 },
  //   'tab2': { title: 'tab2', icon: 'fa-video-camera', component: YoutubeChannelComponent },
  //   'tab3': { title: 'tab3', icon: 'fa-music', component: AudioPage },
  // };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public _fl: FlamelinkService,
    public logger: EventLoggerProvider,
    public splashScreen: SplashScreen,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealingPage');
  }

  ngOnInit() {
    this.logger.setCurrentScreen(this.title);
    let options = {
      populate: [
        {
          field: 'healing1Article'
        },
        {
          field: 'healing2Article'
        },
        {
          field: 'healing3Article'
        },
        {
          field: 'healing4Article'
        },
        {
          field: 'healing1Thumbnail'
        },
        {
          field: 'healing2Thumbnail'
        },
        {
          field: 'healing3Thumbnail'
        },
        {
          field: 'healing4Thumbnail'
        }
      ]
    };
    this._fl.getApp().content.get('healingPage', options)
      .then(data => {
        console.log('healingPage, content', data);
        this.handleResponse(data);
      })
      .catch(error => {
        console.log('healingPage, error', error);
      })
  }

  handleResponse(data) {
    try {
      this.title = data.pageTitle;

      this.healingTab1Title = data.tab1Title;
      this.healingTab2Title = data.tab2Title;

      this.healingPlaylistId = data.healingPlaylistId;

      this.healingChild1 = this.getHealingItemDetails(data, 'healing1Article', 'healing1Thumbnail');
      this.healingChild2 = this.getHealingItemDetails(data, 'healing2Article', 'healing2Thumbnail');
      this.healingChild3 = this.getHealingItemDetails(data, 'healing3Article', 'healing3Thumbnail');
      this.healingChild4 = this.getHealingItemDetails(data, 'healing4Article', 'healing4Thumbnail');
    } catch (error) {
      console.log('healingPage, error', error);
    }
  }

  getHealingItemDetails(element, articleNode, thumbnailNode) {
    return {
      id: element[articleNode][0].id,
      thumbnail: this.popValue(element[thumbnailNode], 'url', null),
      title: element[articleNode][0].title,
      excerpt: element[articleNode][0].excerpt
    }
  }

  popValue(ary: any, key: string, defult: any) {
    return (ary[0] && ary[0][key]) ? ary[0][key] : defult;
  }
}
