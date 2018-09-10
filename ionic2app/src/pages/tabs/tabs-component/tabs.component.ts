import { Component } from '@angular/core';

import { Events } from 'ionic-angular';
import { HomeComponent } from '../../home/home-component/home.component';
import { ContactComponent } from '../../contact/contact-component/contact.component';
import { YoutubeVideosComponent } from '../../youtube/youtube-videos/youtube-videos.component';
import { YoutubeChannelComponent } from '../../youtube/youtube-channel/youtube-channel.component';
import { WordpressPosts } from '../../wordpress/wordpress-posts/wordpress-posts.component';
import { WordpressPost } from '../../wordpress/wordpress-post/wordpress-post.component';
import { PlaceholderComponent } from '../../placeholder/placeholder-component/placeholder.component';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {
  home: any = HomeComponent;
  videos: any = YoutubeChannelComponent;

  map: any = {
    'ABOUT' : { title: 'ABOUT', component: WordpressPost, params: { id: 993 }},
    'VIDEOS' : { title: 'VIDEOS', component: YoutubeChannelComponent},
    'HEALING' : { title: 'HEALING', component: PlaceholderComponent},
    'DONATE' : { title: 'DONATE', component: PlaceholderComponent}
  };
	constructor(private events: Events) {}

  openPage(tabName) {
		//let page = { title: 'ABOUT', component: WordpressPost, params: { id: 993 }};
		this.events.publish('navigationEvent', this.map[tabName]);
	}
}
