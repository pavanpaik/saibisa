import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	//public wordpressApiUrl = 'http://mobile-apps.today/products/ionic/woocommerce-api/wp-json';
	public wordpressApiUrl = 'https://dijaanjayawahi.com/wp-json'
	public wordpressMenusNavigation = false;
	public feedsUrl = './assets/data/feeds.json';
	public feedsCategoryUrl = './assets/data/feeds-category.json';
	public youtubeKey = 'AIzaSyClMa-MaKro_m95tb--4LaAorl-NmGPJxc';
	public youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/';
	public youtubeUsername = 'ColdplayVEVO';
	public youtubeChannelId = 'UCnb6PA08HFf9hRpfPlZgy0A';
	public youtubeResults = 50;
	public emailTo = 'saibisafamily@gmail.com';
}