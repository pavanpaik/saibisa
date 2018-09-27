import { Component } from '@angular/core';

import { NavController, LoadingController, Events, MenuController } from 'ionic-angular';
import { WordpressService } from '../../../app/shared/services/wordpress.service';
import { YoutubeChannelComponent } from '../../youtube/youtube-channel/youtube-channel.component';
import { AboutComponent } from '../../about/about-component/about.component';
import { ArticleComponent } from '../../article/article-component/article.component';
import { AudioPage } from '../../audio/audio-component/audio.component';

import { WordpressPost } from '../../wordpress/wordpress-post/wordpress-post.component'

// import { FlamelinkService } from '../../../app/shared/services/flamelink.service';

@Component({
  selector: 'page-saibisa',
  templateUrl: 'saibisa.html'
})
export class SaibisaComponent {
	selectedPage: string = "tab1";
  
  map: any = {
    'tab1': { title: 'Read', icon: 'fa-book', component: ArticleComponent, params: {postId: 993} },
    'tab2': { title: 'Watch', icon: 'fa-video-camera', component: YoutubeChannelComponent },
    'tab3': { title: 'tab3', icon: 'fa-music', component: AudioPage },
  };

  constructor(public navCtrl: NavController) { }
  
  ngOnInit() { }
}

