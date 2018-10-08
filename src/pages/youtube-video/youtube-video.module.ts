import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { YoutubeVideoPage } from './youtube-video';

@NgModule({
  declarations: [
    YoutubeVideoPage,
  ],
  exports: [
    YoutubeVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(YoutubeVideoPage),
    TranslateModule.forChild()
  ],
})
export class YoutubeVideoPageModule {}
