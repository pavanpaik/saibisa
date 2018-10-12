import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ImagesProvider } from '../../providers/images/images';

import { EventLoggerProvider } from '../../providers/event-logger/event-logger';

@IonicPage()
@Component({
  selector: 'page-image-slider',
  templateUrl: 'image-slider.html',
})
export class ImageSliderPage {

  items: any;
  index: number;
  @ViewChild('slider') slider:Slides;

  constructor(public navCtrl: NavController, navParams: NavParams, public images: ImagesProvider,public logger: EventLoggerProvider) {
    this.index = navParams.get('index');
    this.items = this.images.get();
  }

  ngOnInit() {
    this.logger.setCurrentScreen('ImageSliderPage');
  }

	closeModal() {
		this.navCtrl.pop();
  }
}
