import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { HealingComponent } from './healing-component/healing.component';

@NgModule({
  declarations: [
    HealingComponent
  ],
  imports: [
  	CommonModule,
  	SharedModule
  ],
  exports: [
    HealingComponent
  ],
  entryComponents:[
  	HealingComponent
  ]
})
export class HealingModule {}
