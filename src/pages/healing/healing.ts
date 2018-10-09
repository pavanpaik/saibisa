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

  selectedPage: string = "tab1";

  healingArticleId: string = "1539051108322";
  healingPlaylistId: string = "PLPzS0mASgDd5jMOYUclVhHOytoQPZWZv8";
  testimonialsArticleId: string = "1539050202083";
  testimonialsEnabled: boolean = false;

  map: any = {
    'tab1': { title: 'We Heal', icon: 'fa-book', component: 'ArticlePage', params: { articleId: this.healingArticleId }  },
    'tab2': { title: 'Watch Healing', icon: 'fa-video-camera', component: 'YoutubePage', params: {playlistId: this.healingPlaylistId}  },
    'tab3': { title: 'Testimonial', icon: 'fa-book', component: 'ArticlePage', params: { articleId: this.testimonialsArticleId }  },
  };

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
    let options = {};
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

      /*
      healing: 1539051108322
      healingVideoPlaylist: "PLPzS0mASgDd5jMOYUclVhHOytoQPZWZv8"
      id: "healingPage"
      testimonials: 1539050202083
      testimonialsEnabled: true
      */

     this.healingArticleId = data.healing;
     this.healingPlaylistId = data.healingVideoPlaylist;
     this.testimonialsArticleId = data.testimonials;
     this.testimonialsEnabled = data.testimonialsEnabled;

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
