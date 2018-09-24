import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { ActivityComponent } from './activity-component/activity.component';

@NgModule({
  declarations: [
    ActivityComponent
  ],
  imports: [
  	CommonModule,
  	SharedModule
  ],
  exports: [
    ActivityComponent
  ],
  entryComponents:[
  	ActivityComponent
  ]
})
export class ActivityModule {}
