import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { WordpressService } from '../../wordpress/shared/services/wordpress.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [WordpressService]
})
export class AboutComponent {
  page: any;
  media: any;
  selectedPage: string = "read";
  private wpAboutPostId: Number = 993;

  connectPage: any;
  connectMedia: any;
  private wpConnectPostId: Number = 1006;

  constructor(public navCtrl: NavController,
    private wordpressService: WordpressService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.selectedPage = "read";
    this.getPage(this.wpAboutPostId);
    this.getConnectPage(this.wpConnectPostId);
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
