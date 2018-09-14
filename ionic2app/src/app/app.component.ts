import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Config } from './app.config';

import { TabsComponent } from '../pages/tabs/tabs-component/tabs.component';
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

@Component({
	templateUrl: './app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
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
		private events: Events
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
			{ title: 'READ', component: WordpressPosts, icon: 'paper', params: { category: { name: 'Read', id: 7 } } },
			{ title: 'WATCH', component: YoutubeChannelComponent, icon: 'videocam' },
			// { title: 'LISTEN', component: PlaceholderComponent, icon: 'musical-notes' },
			// { title: 'IMAGES', component: PlaceholderComponent, icon: 'images' },
			{ title: 'CONNECT', component: WordpressPost, icon: 'paper', params: { id: 1006 } }
			// { title: 'SETTINGS', component: SettingsComponent, icon: 'settings' }
		];
		this.wordpressMenusNavigation = config.wordpressMenusNavigation;
	}


	// { title: 'HOME', component: TabsComponent, icon: 'home' },
	// 		{ title: 'SETTINGS', component: SettingsComponent, icon: 'settings'},
	// 		{ title: 'GRID', component: GridComponent, icon: 'grid'},
	// 		{ title: 'DATETIME', component: DatetimeComponent, icon: 'clock'},
	// 		{ title: 'RANGES', component: RangesComponent, icon: 'sunny'},
	// 		{ title: 'ACTION_SHEET', component: ActionSheetComponent, icon: 'create'},
	// 		{ title: 'PLACEHOLDER', component: PlaceholderComponent, icon: 'logo-buffer' },
	// 		{ title: 'Facebook Connect', component: FacebookConnectComponent, icon: 'logo-facebook' },
	// 		{ title: 'LOGIN', component: LoginComponent, icon: 'log-in' }

	//Healing
	//Who We Are
	//What we Do
	//Become a healer
	//Healing Videos
	//Testimonials

	initializeApp() {
		this.platform.ready().then(() => {
			// Enable RTL Support
			// this.platform.setDir('rtl', true);
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {
		this.events.publish('navigationEvent', page);
	}
}
