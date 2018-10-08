import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InitiativesPage } from './initiatives';

@NgModule({
  declarations: [
    InitiativesPage,
  ],
  imports: [
    IonicPageModule.forChild(InitiativesPage),
  ],
})
export class InitiativesPageModule {}
