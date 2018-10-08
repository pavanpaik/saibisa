import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ArticlePage } from './article';

@NgModule({
  declarations: [
    ArticlePage,
  ],
  exports: [
    ArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(ArticlePage),
    TranslateModule.forChild()
  ],
})
export class ArticlePageModule {}
