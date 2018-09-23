import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Config } from './app.config';

import { TabsComponent } from '../pages/tabs/tabs-component/tabs.component';
import { HomeComponent } from '../pages/home/home-component/home.component';
import { GridComponent } from '../pages/grid/grid-component/grid.component';
import { DatetimeComponent } from '../pages/datetime/datetime-component/datetime.component';
import { RangesComponent } from '../pages/ranges/ranges-component/ranges.component';
import { SettingsComponent } from '../pages/settings/settings-component/settings.component';
import { ActionSheetComponent } from '../pages/action-sheet/action-sheet-component/action-sheet.component';
import { PlaceholderComponent } from '../pages/placeholder/placeholder-component/placeholder.component';
import { FacebookConnectComponent } from '../pages/facebook-connect/facebook-connect-component/facebook-connect.component';
import { LoginComponent } from '../pages/login/login-component/login.component';
import { WordpressMenus } from '../pages/wordpress/wordpress-menus/wordpress-menus.component';
import { SlidesComponent } from '../pages/slides/slides-component/slides.component';
import { YoutubeVideosComponent } from '../pages/youtube/youtube-videos/youtube-videos.component';
import { YoutubeChannelComponent } from '../pages/youtube/youtube-channel/youtube-channel.component';
import { WordpressPosts } from '../pages/wordpress/wordpress-posts/wordpress-posts.component';
import { WordpressPost } from '../pages/wordpress/wordpress-post/wordpress-post.component';

import { FirebaseHomeComponent } from '../pages/firebase/firebase-home/firebase-home.component';

import * as firebase from 'firebase';
import flamelink from 'flamelink';


import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../common/is-cordova-available';
import { oneSignalAppId, sender_id } from './app.config';

@Component({
	templateUrl: './app.html'
})
export class MyApp {
	rootPage = TabsComponent;
	menuPage = WordpressMenus;
	pages: Array<{ title: string, component: any, icon: string, params?: any }>;
	wordpressMenusNavigation: boolean = false;

	public theme: String = 'facebook-messenger-theme';

	constructor(
		private platform: Platform,
		private translate: TranslateService,
		private storage: Storage,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private config: Config,
		private menuController: MenuController,
		private events: Events,
		private oneSignal: OneSignal
	) {
		this.initializeApp();

		this.translate.setDefaultLang('en');
		storage.get('language').then((value) => {
			if (value) {
				this.translate.use(value);
			} else {
				this.translate.use('en');
				storage.set('language', 'en');
			}
		});

		this.pages = [
			{ title: 'READ', component: WordpressPosts, icon: 'paper', params: { category: { name: 'Activities', id: 10} } },
			{ title: 'WATCH', component: YoutubeChannelComponent, icon: 'videocam' },
			// { title: 'LISTEN', component: PlaceholderComponent, icon: 'musical-notes' },
			// { title: 'IMAGES', component: PlaceholderComponent, icon: 'images' },
			{ title: 'CONNECT', component: WordpressPost, icon: 'paper', params: { id: 1006 } },
			{ title: 'EXPERIMENT', component: FirebaseHomeComponent, icon: 'aperture' },
			// { title: 'SETTINGS', component: SettingsComponent, icon: 'settings' }
		];
		this.wordpressMenusNavigation = config.wordpressMenusNavigation;
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Enable RTL Support
			// this.platform.setDir('rtl', true);
			this.statusBar.styleDefault();
			this.splashScreen.hide();

			if (isCordovaAvailable()){
				this.oneSignal.startInit(oneSignalAppId, sender_id);
				this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
				this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
				this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
				this.oneSignal.endInit();
			}
		});
	}

	onPushReceived(payload: OSNotificationPayload) {
		this.events.publish('onPushReceived', payload);
	}
	
	onPushOpened(payload: OSNotificationPayload) {
		this.events.publish('onPushOpened', payload);
	}
	
	openPage(page) {
		this.events.publish('navigationEvent', page);
	}
}
