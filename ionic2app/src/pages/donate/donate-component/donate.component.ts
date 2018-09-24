import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { WordpressService } from '../../../app/shared/services/wordpress.service';

@Component({
  selector: 'page-donate',
  templateUrl: 'donate.html',
  providers: [WordpressService]
})
export class DonateComponent {
  page: any;
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
        this.page.featImgSrc =result._embedded["wp:featuredmedia"][0].source_url;
        
      },
        error => console.log(error),
        () => loader.dismiss());
  }
}
