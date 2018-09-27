import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Events, MenuController } from 'ionic-angular';
import { WordpressService } from '../../../app/shared/services/wordpress.service';
import { WordpressPost } from '../../wordpress/wordpress-post/wordpress-post.component';
import { ArticleComponent } from '../../article/article-component/article.component';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityComponent {
	selectedPage: string = "tab1";
  
  map: any = {
    'tab1': { title: 'My Golden Pen', icon: 'fa-book', component: ArticleComponent, params: {postId: 1193} },
    'tab2': { title: 'Better Our World', icon: 'fa-book', component: ArticleComponent, params: {postId: 1197} },
    'tab3': { title: 'Green the World', icon: 'fa-book', component: ArticleComponent, params: {postId: 1200} },
		'tab4': { title: 'Life Of Sai', icon: 'fa-book', component: ArticleComponent, params: {postId: 1202} },
		'tab5': { title: 'LifeLine India', icon: 'fa-book', component: ArticleComponent, params: {postId: 1204} },
  };

  constructor(public navCtrl: NavController) { }
  
  ngOnInit() { }
}
