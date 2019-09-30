import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { BookPage } from './book';

@NgModule({
  declarations: [
    BookPage,
  ],
  exports: [
    BookPage,
  ],
  imports: [
    IonicPageModule.forChild(BookPage),
    TranslateModule.forChild()
  ]
})
export class BookPageModule {}
