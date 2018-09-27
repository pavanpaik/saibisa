import { Component } from '@angular/core';

import { NavParams, NavController, Events, MenuController } from 'ionic-angular';
import { HomeComponent } from '../../home/home-component/home.component';
import { SaibisaComponent } from '../../saibisa/saibisa-component/saibisa.component';
import { ActivityComponent } from '../../activity/activity-component/activity.component';
import { HealingComponent } from '../../healing/healing-component/healing.component';
import { WordpressPosts } from '../../wordpress/wordpress-posts/wordpress-posts.component';
import { WordpressPost } from '../../wordpress/wordpress-post/wordpress-post.component';
import { PlaceholderComponent } from '../../placeholder/placeholder-component/placeholder.component';
import { AudioPage } from '../../audio/audio-component/audio.component';
import { ArticleComponent } from '../../article/article-component/article.component';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {
  //DonateComponent
  map: any = {
    'HOME': { title: 'HOME', component: HomeComponent },
    'ABOUT': { title: 'ABOUT', component: SaibisaComponent },
    'ACTIVITIES': { title: 'ACTIVITIES', component: ActivityComponent},
    'EVENTS': { title: 'EVENTS', component: ArticleComponent, params: {postId: 1211, postListId: 9} },
    'HEALING': { title: 'HEALING', component: HealingComponent },
    'CHORDS': { title: 'CHORDS', component: AudioPage},
  };

  constructor(
    private navParams: NavParams,
    private navController: NavController,
    private events: Events,
    private menuController: MenuController) { }

  tabChange(tab: any){
      this.events.publish('tabinationEvent', tab);
  }
}
