import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, ToastController, Events } from 'ionic-angular';

import { MainPage } from '../pages';

import { isCordovaAvailable } from '../common/is-cordova-available';

import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { oneSignalAppId, sender_id } from './app.config';

@Component({
  template: `<ion-split-pane>
    <ion-menu [content]="content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Pages</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
            <ion-icon name="{{p.icon}}"></ion-icon>
            {{p.title}}
          </button>
        </ion-list>
      </ion-content>

    </ion-menu>
    <ion-nav main #content [root]="rootPage"></ion-nav>
    </ion-split-pane>`
})
export class MyApp {
  rootPage = MainPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Di Jaan Jaya Wahi', icon: 'star', component: 'DijaanPage' },
    // { title: 'About Di Jaan', icon: 'star', component: 'ArticlePage', params: { articleId: '1538910075447' }  },
    { title: 'Di Jaan - Videos', icon: 'videocam', component: 'YoutubePage', params: { playlistId: 'PLPzS0mASgDd42z1HM_HKXkSvKZT7L5SDH' } },
    { title: 'Di Jaan - Books', icon: 'book', component: 'ArticlePage', params: { articleId: '1538935188821' }  },
    { title: 'Events', icon: 'calendar', component: 'ArticlePage', params: { articleId: '1538935661036' }  },
    { title: 'Donate', icon: 'heart', component: 'DonatePage' },
    { title: 'Contact Us', icon: 'mail', component: 'ContactPage' },

    // { title: 'Welcome', component: 'WelcomePage' },
    // { title: 'Login', component: 'LoginPage' },
    // { title: 'Signup', component: 'SignupPage' },

    // { title: 'Cards', component: 'CardsPage' },
    // { title: 'Master Detail', component: 'ListMasterPage' },

    // { title: 'Menu', component: 'MenuPage' },
    // { title: 'Settings', component: 'SettingsPage' },
    // { title: 'Search', component: 'SearchPage' }
  ]

  constructor(
    public translate: TranslateService,
    public platform: Platform,
    public config: Config,
    public statusBar: StatusBar,
    public events: Events,
    public oneSignal: OneSignal,
    public toastController: ToastController,
    public cdRef: ChangeDetectorRef
  ) {

    platform.ready().then(() => {
      this.initializeApp();
    });
    this.initTranslate();
  }

  initializeApp() {
    if (isCordovaAvailable()) {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      // this.splashScreen.hide();

      //Handle Push Notification
      this.oneSignal.startInit(oneSignalAppId, sender_id);
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
      this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
      this.oneSignal.endInit();
    }
  }

  onPushReceived(payload: OSNotificationPayload) {
    this.showToastMessage(payload);
    this.handlePushNotification(payload);
  }

  onPushOpened(payload: OSNotificationPayload) {
    this.handlePushNotification(payload);
  }


  showToastMessage(payload: OSNotificationPayload) {
    let toast = this.toastController.create({
      message: `${payload.title} : ${payload.body}`,
      duration: 6000,
      position: 'top',
      showCloseButton: true
    });
    toast.present();
  }

  handlePushNotification(payload: OSNotificationPayload) {
    this.cdRef.detectChanges();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    this.events.publish('navigationEvent', page);
  }
}
