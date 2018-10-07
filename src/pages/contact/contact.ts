import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { FlamelinkService } from '../../app/shared/services/flamelink.service';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Generated class for the DonatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  title: string = 'Contact Us';
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
    console.log('ionViewDidLoad ContactPage');
  }

  ngOnInit() {
    this.logger.setCurrentScreen(this.title);
    
    this._fl.getApp().content.subscribe('contactPage', { populate: true }, (error, data) => {
      if (error) {
        console.error(error);
      }
      console.log('contactPage, content', data);
      this.title = data.pageTitle;
      this.content = data.content;
      if(data.heroImage && data.heroImage.length > 0) {
        this.heroImage = data.heroImage[0].url;
      }
    });
  }
}
