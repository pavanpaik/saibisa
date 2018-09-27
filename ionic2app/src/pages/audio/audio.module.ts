import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudioPage } from './audio-component/audio.component';

@NgModule({
  declarations: [
    AudioPage,
  ],
  imports: [
    IonicPageModule.forChild(AudioPage),
  ],
})
export class AudioPageModule {}
