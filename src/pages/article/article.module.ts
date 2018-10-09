import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ArticlePage } from './article';
import { PhotoViewer } from '@ionic-native/photo-viewer';

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
  providers:[
    PhotoViewer
  ]
})
export class ArticlePageModule {}
