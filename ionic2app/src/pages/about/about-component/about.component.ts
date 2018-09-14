import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutComponent {

  aboutSegment1 = "read";

  constructor(public navCtrl: NavController) {

  }

}
