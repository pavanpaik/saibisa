import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { PodcastComponent } from './podcast-component/podcast.component';

@NgModule({
  declarations: [
    PodcastComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PodcastComponent
  ],
  entryComponents: [
    PodcastComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PodcastModule { }
