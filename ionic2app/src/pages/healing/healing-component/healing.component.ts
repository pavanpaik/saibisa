import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { YoutubeChannelComponent } from '../../youtube/youtube-channel/youtube-channel.component';
import { WordpressPost } from '../../wordpress/wordpress-post/wordpress-post.component'

@Component({
  selector: 'page-healing',
  templateUrl: 'healing.html'
})
export class HealingComponent {
  selectedPage: string = "read";

  readHealingPage = WordpressPost
  readHealingPageParam = { id : '1019', island: true}
  watchPage = YoutubeChannelComponent

  constructor(public navCtrl: NavController) { }
}
