import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutComponent {

  aboutSegment1 = "read";


	slides = [
		{
			image: "assets/img/banners/about_banner.jpg",
		}
  ];
  
  constructor(public navCtrl: NavController) {

  }

}
