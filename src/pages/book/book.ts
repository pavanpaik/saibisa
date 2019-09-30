import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Slides } from 'ionic-angular';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {

  title: string = 'Book';
  bookId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public logger: EventLoggerProvider,
    public modalCtrl : ModalController) {

    this.bookId = navParams.get('bookId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }

  ngOnInit() {
    this.logger.setCurrentScreen(this.title);
  }

}
