import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { ArticleComponent } from './article-component/article.component';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
  	CommonModule,
  	SharedModule
  ],
  exports: [
    ArticleComponent
  ],
  entryComponents:[
  	ArticleComponent
  ],
  providers:[
    PhotoViewer
  ]
})
export class ArticleModule {}
