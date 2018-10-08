import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { FlamelinkService } from '../../app/shared/services/flamelink.service';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
import { SplashScreen } from '@ionic-native/splash-screen';

@IonicPage()
@Component({
  selector: 'page-donate',
  templateUrl: 'donate.html',
})
export class DonatePage {
  title: string = 'Donate';
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
    console.log('ionViewDidLoad DonatePage');
  }

  ngOnInit() {
    this.logger.setCurrentScreen(this.title);
    
    this._fl.getApp().content.subscribe('donatePage', { populate: true }, (error, data) => {
      if (error) {
        console.error(error);
      }
      console.log('donatePage, content', data);
      try {
        this.title = data.pageTitle;
        this.content = data.content;
        if(data.heroImage && data.heroImage.length > 0) {
          this.heroImage = data.heroImage[0].url;
        }
      } catch (e) {
        console.log('donatePage, error', e);
      }
    });
  }
}
