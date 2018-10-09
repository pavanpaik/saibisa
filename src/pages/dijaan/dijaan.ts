import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { FlamelinkService } from '../../app/shared/services/flamelink.service';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
import { SplashScreen } from '@ionic-native/splash-screen';

@IonicPage()
@Component({
  selector: 'page-dijaan',
  templateUrl: 'dijaan.html',
})
export class DijaanPage {
  title: string = 'Di Jaan Jaya Wahi';

  selectedPage: string = "tab1";

  diJaanArticleId: string = "1538910075447";
  diJaanPlaylistId: string = "PLPzS0mASgDd42z1HM_HKXkSvKZT7L5SDH";

  map: any = {
    'tab1': { title: 'Read', icon: 'fa-book', component: 'ArticlePage', params: { articleId: this.diJaanArticleId }  },
    'tab2': { title: 'Watch', icon: 'fa-video-camera', component: 'YoutubePage', params: {playlistId: this.diJaanPlaylistId}  },
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
    console.log('ionViewDidLoad DijaanPage');
  }

  ngOnInit() {
    this.logger.setCurrentScreen('DiJaanPage');
    let options = {};
    this._fl.getApp().content.get('dijaanPage', options)
      .then(data => {
        console.log('dijaanPage, content', data);
        this.handleResponse(data);
      })
      .catch(error => {
        console.log('dijaanPage, error', error);
      })
  }

  handleResponse(data) {
    try {
      this.title = data.pageTitle;
    } catch (error) {
      console.log('dijaanPage, error', error);
    }
  }

  popValue(ary: any, key: string, defult: any) {
    return (ary[0] && ary[0][key]) ? ary[0][key] : defult;
  }
}
