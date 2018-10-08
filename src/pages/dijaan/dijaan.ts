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
  title: string = 'Dijaan';
  heroImage: string;
  content: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public _fl: FlamelinkService,
    public logger: EventLoggerProvider,
    public splashScreen: SplashScreen,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DijaanPage');
  }

  ngOnInit() {
    this.logger.setCurrentScreen(this.title);
    
    this._fl.getApp().content.subscribe('diJaanPage', { populate: true }, (error, data) => {
      if (error) {
        console.error(error);
      }
      console.log('dijaanPage, content', data);
      this.handleResponse(data);
    });
  }

  handleResponse(data) {
    try {
      this.title = data.pageTitle;
      this.content = data.content;
      if(data.heroImage && data.heroImage.length > 0) {
        this.heroImage = data.heroImage[0].url;
      }
    } catch (error) {
      console.log('dijaanPage, error', error);
    }
  }
}
