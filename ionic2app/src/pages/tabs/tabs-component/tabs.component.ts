import { Component } from '@angular/core';

import { NavParams, NavController, Events, MenuController } from 'ionic-angular';
import { HomeComponent } from '../../home/home-component/home.component';
import { SaibisaComponent } from '../../saibisa/saibisa-component/saibisa.component';
import { DonateComponent } from '../../donate/donate-component/donate.component';
import { ActivityComponent } from '../../activity/activity-component/activity.component';
import { HealingComponent } from '../../healing/healing-component/healing.component';
import { YoutubeVideosComponent } from '../../youtube/youtube-videos/youtube-videos.component';
import { YoutubeChannelComponent } from '../../youtube/youtube-channel/youtube-channel.component';
import { WordpressPosts } from '../../wordpress/wordpress-posts/wordpress-posts.component';
import { WordpressPost } from '../../wordpress/wordpress-post/wordpress-post.component';
import { PlaceholderComponent } from '../../placeholder/placeholder-component/placeholder.component';
import { AudioPage } from '../../audio/audio-component/audio.component';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {
  home: any = HomeComponent;
  about: any = SaibisaComponent;
  donate: any = AudioPage;//DonateComponent;
  videos: any = YoutubeChannelComponent;
  healing: any = HealingComponent;
  mySelectedIndex: number = 0;

  eventPageComponent: any = WordpressPosts;
  eventsPageParam: any = { category: { name: 'Events', id: 9 } };
  
  activitiesPageComponent: any = ActivityComponent;
  activitiesPageParam: any = { category: { name: 'Activities', id: 10 } };


  //{ title: 'READ', component: WordpressPosts, icon: 'paper', params: { category: { name: 'Read', id: 7 } } }

  map: any = {
    'ABOUT': { title: 'ABOUT', component: WordpressPost, params: { id: 993 } },
    'VIDEOS': { title: 'VIDEOS', component: YoutubeChannelComponent },
    'HEALING': { title: 'HEALING', component: PlaceholderComponent },
    'DONATE': { title: 'DONATE', component: PlaceholderComponent }
  };
  
  constructor(
    private navParams: NavParams,
    private navController: NavController,
    private menuController: MenuController,
    private events: Events) { }
}
