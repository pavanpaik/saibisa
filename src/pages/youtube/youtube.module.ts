import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { YoutubePage } from './youtube';
import { YoutubeVideoPageModule } from '../youtube-video/youtube-video.module';
import { ModalContentPage } from './modal/modal';

@NgModule({
  declarations: [
    YoutubePage,
    ModalContentPage
  ],
  imports: [
    IonicPageModule.forChild(YoutubePage)
  ],
  entryComponents: [ModalContentPage]
})
export class YoutubePageModule { }
