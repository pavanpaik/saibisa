import { Component } from '@angular/core';

import { NavController, LoadingController, Events, MenuController } from 'ionic-angular';
import { WordpressService } from '../../../app/shared/services/wordpress.service';
import { YoutubeChannelComponent } from '../../youtube/youtube-channel/youtube-channel.component';
import { AudioPage } from '../../audio/audio-component/audio.component';
import { ArticleComponent } from '../../article/article-component/article.component';
// import { FlamelinkService } from '../../../app/shared/services/flamelink.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutComponent {
	selectedPage: string = "tab1";
  
  map: any = {
    'tab1': { title: 'tab1', icon: 'fa-book', component: ArticleComponent, params: {postId: 993}, postListId: 0 },
    'tab2': { title: 'tab2', icon: 'fa-video-camera', component: YoutubeChannelComponent },
    'tab3': { title: 'tab3', icon: 'fa-music', component: AudioPage },
  };

  constructor(public navCtrl: NavController) { }
  
  ngOnInit() { }
}
