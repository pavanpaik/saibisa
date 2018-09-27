import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { ArticleComponent } from './article-component/article.component';

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
  ]
})
export class ArticleModule {}
