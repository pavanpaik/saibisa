import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { SaibisaComponent } from './saibisa-component/saibisa.component';

@NgModule({
  declarations: [
    SaibisaComponent
  ],
  imports: [
  	CommonModule,
  	SharedModule
  ],
  exports: [
    SaibisaComponent
  ],
  entryComponents:[
  	SaibisaComponent
  ]
})
export class SaibisaModule {}
