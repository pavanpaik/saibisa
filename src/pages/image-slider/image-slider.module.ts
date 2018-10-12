import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageSliderPage } from './image-slider';

@NgModule({
  declarations: [
    ImageSliderPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageSliderPage),
    TranslateModule.forChild()
  ],
  exports: [
    ImageSliderPage
  ]
})
export class ImageSliderPageModule {}
