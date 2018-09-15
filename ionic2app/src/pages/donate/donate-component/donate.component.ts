import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { WordpressService } from '../../wordpress/shared/services/wordpress.service';

@Component({
  selector: 'page-donate',
  templateUrl: 'donate.html',
  providers: [WordpressService]
})
export class DonateComponent {
  page: any;
  media: any;
  private wpPostId: Number = 1014;

  constructor(public navCtrl: NavController,
    private wordpressService: WordpressService,
    private loadingController: LoadingController) { }

  ngOnInit() {
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
