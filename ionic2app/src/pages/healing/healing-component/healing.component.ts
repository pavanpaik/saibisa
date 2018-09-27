import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { YoutubeChannelComponent } from '../../youtube/youtube-channel/youtube-channel.component';
import { WordpressPost } from '../../wordpress/wordpress-post/wordpress-post.component'
import { ArticleComponent } from '../../article/article-component/article.component';

@Component({
  selector: 'page-healing',
  templateUrl: 'healing.html'
})
export class HealingComponent {
  selectedPage: string = "tab1";
  
  map: any = {
    'tab1': { title: 'Who are We', icon: 'fa-book', component: ArticleComponent, params: {postId: 1185} },
    'tab2': { title: 'What we do', icon: 'fa-book', component: ArticleComponent, params: {postId: 1187} },
    'tab3': { title: 'Become a Healer', icon: 'fa-book', component: ArticleComponent, params: {postId: 1189} },
    'tab4': { title: 'Testimonial', icon: 'fa-book', component: ArticleComponent, params: {postId: 1213} },
  };

  constructor(public navCtrl: NavController) { }
  
  ngOnInit() { }
}
