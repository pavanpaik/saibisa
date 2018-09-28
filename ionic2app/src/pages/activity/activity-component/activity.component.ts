import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Events, MenuController } from 'ionic-angular';
import { WordpressService } from '../../../app/shared/services/wordpress.service';
import { WordpressPost } from '../../wordpress/wordpress-post/wordpress-post.component';
import { ArticleComponent } from '../../article/article-component/article.component';
import { YoutubeChannelComponent } from '../../youtube/youtube-channel/youtube-channel.component';
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityComponent {
	selectedPage: string = "tab1";
  /**
   'tab1': { title: 'My Golden Pen', icon: 'fa-book', component: ArticleComponent, params: {postId: 1193} },
    'tab2': { title: 'Better Our World', icon: 'fa-book', component: ArticleComponent, params: {postId: 1197} },
    'tab3': { title: 'Green the World', icon: 'fa-book', component: ArticleComponent, params: {postId: 1200} },
		'tab4': { title: 'Life Of Sai', icon: 'fa-book', component: ArticleComponent, params: {postId: 1202} },
		'tab5': { title: 'LifeLine India', icon: 'fa-book', component: ArticleComponent, params: {postId: 1204} },
   */
  map: any = {
    'tab1': { title: 'SAIBISA Initiatives', icon: 'fa-book', component: ArticleComponent, params: {postId: 1152, postListId: 15} },
    'tab2': { title: 'Watch Healing', icon: 'fa-video-camera', component: YoutubeChannelComponent }
  };

  constructor(public navCtrl: NavController) { }
  
  ngOnInit() { }
}
