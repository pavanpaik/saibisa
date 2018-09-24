import { Component } from '@angular/core';

import { NavController, LoadingController, Events, MenuController } from 'ionic-angular';
import { WordpressService } from '../../../app/shared/services/wordpress.service';
import { YoutubeChannelComponent } from '../../youtube/youtube-channel/youtube-channel.component';
import { AboutComponent } from '../../about/about-component/about.component';
import { WordpressPost } from '../../wordpress/wordpress-post/wordpress-post.component'

// import { FlamelinkService } from '../../../app/shared/services/flamelink.service';

@Component({
  selector: 'page-saibisa',
  templateUrl: 'saibisa.html'
})
export class SaibisaComponent {
  selectedPage: string = "read";
  aboutPage = AboutComponent
  watchPage = YoutubeChannelComponent
  contactPage = WordpressPost
  contactPageParam = { id : '1006', island: true}
  
  constructor(public navController: NavController,
		private menuController: MenuController,
		private events: Events) { }
}
