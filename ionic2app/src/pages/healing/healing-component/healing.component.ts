import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { WordpressService } from '../../wordpress/shared/services/wordpress.service';
import { YoutubeChannelComponent } from '../../youtube/youtube-channel/youtube-channel.component';

@Component({
  selector: 'page-healing',
  templateUrl: 'healing.html',
  providers: [WordpressService]
})
export class HealingComponent {
  page: any;
  media: any;
  selectedPage: string = "read";
  private wpPostId: Number = 1019;

  watchPage = YoutubeChannelComponent

  constructor(public navCtrl: NavController,
    private wordpressService: WordpressService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.selectedPage = "read";
    this.getPage(this.wpPostId);
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
}
