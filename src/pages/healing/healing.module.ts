import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealingPage } from './healing';

@NgModule({
  declarations: [
    HealingPage,
  ],
  imports: [
    IonicPageModule.forChild(HealingPage),
  ],
})
export class HealingPageModule {}
