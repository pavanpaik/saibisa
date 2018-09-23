import { Component } from '@angular/core';

import { NavParams, NavController, Events, MenuController } from 'ionic-angular';
import { HomeComponent } from '../../home/home-component/home.component';
import { AboutComponent } from '../../about/about-component/about.component';
import { DonateComponent } from '../../donate/donate-component/donate.component';
import { HealingComponent } from '../../healing/healing-component/healing.component';
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
  about: any = AboutComponent
  donate: any = DonateComponent
  videos: any = YoutubeChannelComponent;
  healing: any = HealingComponent;
  mySelectedIndex: number = 0;

  eventPageComponent: any = WordpressPosts;
  eventsPageParam: any = { category: { name: 'Events', id: 9 } };
  
  activitiesPageComponent: any = WordpressPosts;
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
    private events: Events) { 

    }

    ngOnInit() {
      // this.events.subscribe('navigationEvent',(object) => {
      //     this.menuController.close();
      //     if (object.component) {
      //       this.events.publish('tabEvent', 0);
      //       this.app.getRootNav().getActiveChildNav().select(0);
      //       this.navController.push(object.component, object.params);
      //     }
      // });

      this.events.subscribe('tabEvent',(val) => {
        this.mySelectedIndex = val;
      });
    }
}
