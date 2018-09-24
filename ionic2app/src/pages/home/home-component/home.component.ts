import { Component, ChangeDetectorRef } from '@angular/core';
import { App, NavController, Events, MenuController, ToastController } from 'ionic-angular';

import { AboutComponent } from '../../about/about-component/about.component';
import { WordpressHome } from '../../wordpress/wordpress-home/wordpress-home.component';
import { WordpressPosts } from '../../wordpress/wordpress-posts/wordpress-posts.component';
import { WordpressCategories } from '../../wordpress/wordpress-categories/wordpress-categories.component';
import { WordpressTags } from '../../wordpress/wordpress-tags/wordpress-tags.component';
import { WordpressFavorites } from '../../wordpress/wordpress-favorites/wordpress-favorites.component';
import { WordpressPages } from '../../wordpress/wordpress-pages/wordpress-pages.component';
import { WordpressPage } from '../../wordpress/wordpress-page/wordpress-page.component';
import { WordpressMenus } from '../../wordpress/wordpress-menus/wordpress-menus.component';
import { GoogleMapsComponent } from '../../google-maps/google-maps-component/google-maps.component';
import { SlidesComponent } from '../../slides/slides-component/slides.component';
import { FeedCategoriesComponent } from '../../feeds/feed-categories/feed-categories.component';
import { FeedCategoryComponent } from '../../feeds/feed-category/feed-category.component';
import { YoutubeVideosComponent } from '../../youtube/youtube-videos/youtube-videos.component';
import { YoutubeChannelComponent } from '../../youtube/youtube-channel/youtube-channel.component';
import { ChartsComponent } from '../../charts/charts-component/charts.component';
import { FirebaseHomeComponent } from '../../firebase/firebase-home/firebase-home.component';
import { TabsComponent } from '../../tabs/tabs-component/tabs.component';

import { OSNotificationPayload } from '@ionic-native/onesignal';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomeComponent {
	msgTitle: string = 'Di Jaan Speaks...';
	msgContent: string = 'Baba Sai is the divinity within us, the goodness within us, the love within us. He is birth-less, death-less, time-less, space-less... He is the One Eternal Cosmic Soul... our Soul.';

	constructor(
		private navController: NavController,
		private menuController: MenuController,
		private events: Events,
		private app: App,
		private toastController: ToastController,
		private cdRef: ChangeDetectorRef) { }
	slides = [
		{
			image: "assets/img/banners/baba_100.jpg",
		},
		{
			image: "assets/img/banners/walkathon_1.jpg",
		}
	];

	ngOnInit() {
		
		// let payload = {
		// 	title : 'Di Jaan Speaks',
		// 	body: 'Baba Sai is the divinity within us, the goodness within us, the love within us. He is birth-less, death-less, time-less, space-less... He is the One Eternal Cosmic Soul... our Soul.'
		// }
		// this.showToastMessage(payload);
		this.events.subscribe('onPushReceived', (payload: OSNotificationPayload) => {
			this.showToastMessage(payload);
			this.handlePushNotification(payload);
		});

		this.events.subscribe('onPushOpened', (payload: OSNotificationPayload) => {
			this.handlePushNotification(payload);
		});

	    this.events.subscribe('navigationEvent',(object) => {
	    	this.menuController.close();
				if (object.component) {
					this.app.getRootNav().getActiveChildNav().select(0);
					this.navController.push(object.component, object.params);
				}
		});
	}

	showToastMessage(payload:OSNotificationPayload) {
		let toast = this.toastController.create({
			message: `${payload.title} : ${payload.body}`,
			duration: 6000,
			position: 'top',
			showCloseButton: true
		});
		toast.present();
	}

	handlePushNotification(payload: OSNotificationPayload) {
		this.msgTitle=payload.title;
		this.msgContent=payload.body;
		this.cdRef.detectChanges();
	}
}
