import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Events, LoadingController, MenuController } from 'ionic-angular';

import { FlamelinkService } from '../../app/shared/services/flamelink.service';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { isCordovaAvailable } from '../../common/is-cordova-available';

import { Config } from '../../app/app.config';

import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  title: string = 'Home';
  msgTitle: string = '';
  msgContent: string = '';
  slides: any;
  splashBg: string = '../assets/img/static-app-banner.png';
  splashLogo: string = '../assets/img/splash-logo-loading.png';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private menuController: MenuController,
    private app: App,
    private events: Events,
    public _fl: FlamelinkService,
    public logger: EventLoggerProvider,
    public splashScreen: SplashScreen,
    public appVersion: AppVersion,
    public config: Config, public http: Http
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ngOnInit() {
    this.logger.setCurrentScreen(this.title);
    
    if (isCordovaAvailable()) {
      this.appVersion.getVersionNumber()
      .then(data => {
        this.handleVersionCheck(data);
      })
    }

    this._fl.getApp().content.subscribe('homePage', { populate: true }, (error, data) => {
      if (error) {
        console.error('homePage, error', error);
      }
      console.log('homePage, content', data);
      this.processResponse(data);
      this.splashScreen.hide();
    });

    this.events.subscribe('navigationEvent', (object) => {
      this.menuController.close();
      if (object.component) {
        this.app.getRootNav().getActiveChildNav().select(0);
        this.navCtrl.push(object.component, object.params);
      }
    });
  }

  handleVersionCheck(currentVersion) {
    var url = this.config.versionCheckUrl + '?appVersion=' + currentVersion
    this.http.get(url)
    .subscribe(data => {
      try {
        if(data.json().forceUpdate) {
          this.logger.logForceUpdateEvent(data.json());
          this.openForceUpdatePage();
        }
      } catch(error) {
        console.error('handleVersionCheck, error', JSON.stringify(error));
      }
    })
  }

  openForceUpdatePage() {
    this.events.publish('navigationEvent', { component: 'UpdatePage' });
  }

  processResponse(data: any) {
    try {
      this.title = data.pageTitle;
      this.msgTitle = data.mainMessageTitle;
      this.msgContent = data.mainMessageContent;
      let temp: any = [];
      data.imageDeck.forEach((ele) => {
        temp.push({ image: ele.image[0].url });
      })
      this.slides = temp;
      if (data.splashBg && data.splashBg.length > 0) {
        this.splashBg = data.splashBg[0].url;
      }
      if (data.splashLogo && data.splashLogo.length > 0) {
        this.splashLogo = data.splashLogo[0].url;
      }
    } catch (error) {
      console.error('homePage, error', error);
    }
  }
}
