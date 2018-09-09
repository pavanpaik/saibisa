import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	public wordpressApiUrl = 'http://mobile-apps.today/products/ionic/woocommerce-api/wp-json';
	// public wordpressApiUrl = 'http://demo.wp-api.org/wp-json'
	public wordpressMenusNavigation = false;
	public feedsUrl = './assets/data/feeds.json';
	public feedsCategoryUrl = './assets/data/feeds-category.json';
	public youtubeKey = 'AIzaSyClMa-MaKro_m95tb--4LaAorl-NmGPJxc';
	public youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/';
	public youtubeUsername = 'ColdplayVEVO';
	public youtubeChannelId = 'UCRrW0ddrbFnJCbyZqHHv4KQ';
	public youtubeResults = 50;
	public emailTo = 'gtsopour@gmail.com';
}