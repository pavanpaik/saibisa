import { Component } from '@angular/core';

import { NavController, LoadingController, Events, MenuController } from 'ionic-angular';
import { WordpressService } from '../../wordpress/shared/services/wordpress.service';
import { YoutubeChannelComponent } from '../../youtube/youtube-channel/youtube-channel.component';
// import { FlamelinkService } from '../../../app/shared/services/flamelink.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [
    WordpressService,
    // FlamelinkService
  ]
})
export class AboutComponent {
  page: any;
  media: any;
  selectedPage: string = "read";
  private wpAboutPostId: Number = 993;

  watchPage = YoutubeChannelComponent

  connectPage: any;
  connectMedia: any;
  private wpConnectPostId: Number = 1006;
  
  constructor(public navController: NavController,
    private wordpressService: WordpressService,
    // private flamelinkService: FlamelinkService,
    private loadingController: LoadingController,
		private menuController: MenuController,
		private events: Events) { }

  ngOnInit() {
    this.selectedPage = "read";
    this.getPage(this.wpAboutPostId);
    this.getConnectPage(this.wpConnectPostId);


    // this.flamelinkService.getApp().content.get('home')
		// .then(homeContent => {
		// 	const data:any = homeContent;
		// 	console.log('homeContent', data);
		// 	data.imageDeck.forEach(function(val) {
		// 		console.log(val)
		// 		this.flamelinkService.getApp().storage.getURL(val.image[0])
		// 		.then(url => console.log('File URL:', url))
		// 		.catch(error => console.error('Something went wrong while retrieving the file URL. Details:', error));
		// 	})
		// })
		// .catch(error => console.log(error))
  }

  getPage(id) {
    let loader = this.loadingController.create({
      content: "Please wait"
    });

    loader.present();
    this.wordpressService.getPost(id)
      .subscribe(result => {
        this.page = result;
        if (result) {
          this.getMedia(result.featured_media);
        }
      },
        error => console.log(error),
        () => loader.dismiss());
  }

  getMedia(id) {
    this.wordpressService.getMedia(id)
      .subscribe(result => {
        this.media = result;
      });
  }


  getConnectPage(id) {
    let loader = this.loadingController.create({
      content: "Please wait"
    });

    loader.present();
    this.wordpressService.getPost(id)
      .subscribe(result => {
        this.connectPage = result;
        if (result) {
          this.getConnectMedia(result.featured_media);
        }
      },
        error => console.log(error),
        () => loader.dismiss());
  }

  getConnectMedia(id) {
    this.wordpressService.getMedia(id)
      .subscribe(result => {
        this.connectMedia = result;
      });
  }
}
