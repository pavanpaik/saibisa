import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YoutubeVideoPage } from './youtube-video';

@NgModule({
  declarations: [
    YoutubeVideoPage,
  ],
  exports: [
    YoutubeVideoPage,
  ],
  entryComponents: [
    YoutubeVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(YoutubeVideoPage),
  ],
})
export class YoutubeVideoPageModule {}
