import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { DonateComponent } from './donate-component/donate.component';

@NgModule({
  declarations: [
    DonateComponent
  ],
  imports: [
  	CommonModule,
  	SharedModule
  ],
  exports: [
    DonateComponent
  ],
  entryComponents:[
  	DonateComponent
  ]
})
export class DonateModule {}
