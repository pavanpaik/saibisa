import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { FlamelinkService } from '../../app/shared/services/flamelink.service';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  title: string = '';
  msgTitle: string = 'Di Jaan Speaks...';
  msgContent: string = 'Baba Sai is the divinity within us, the goodness within us, the love within us. He is birth-less, death-less, time-less, space-less... He is the One Eternal Cosmic Soul... our Soul.';
  slides: any;
  splashBg: string = '../assets/img/static-app-banner.png';
  splashLogo: string = '../assets/img/dii.png';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public _fl: FlamelinkService,
    public logger: EventLoggerProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ngOnInit() {
    this.logger.setCurrentScreen('Home Page');
    this._fl.getApp().content.subscribe('homePage', { populate: true }, (error, data) => {
      if (error) {
        console.error(error);
      }
      console.log('homePage, content', data);
      this.title = data.pageTitle;
      this.msgTitle = data.mainMessageTitle;
      this.msgContent = data.mainMessageContent;
      let temp:any = [];
      data.imageDeck.forEach((ele) => {
        temp.push({ image: ele.image[0].url });
      })
      this.slides = temp;
      if(data.splashBg && data.splashBg.length > 0) {
        this.splashBg = data.splashBg[0].url;
      }
      if(data.splashLogo && data.splashLogo.length > 0) {
        this.splashLogo = data.splashLogo[0].url;
      }
    });
  }
}
