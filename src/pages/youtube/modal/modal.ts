import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
@Component({
  templateUrl: 'modal.html'
})

export class ModalContentPage {

character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    var character = [     
      {
        image:'https://www.tutorialsplane.com/wp-content/uploads/2017/02/girl.1361906__180.png',
        name: 'Kelly',
        text: 'This is kelly from USA.'
      }
    ];
    this.character = character[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}