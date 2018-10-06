import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { FlamelinkService } from '../../app/shared/services/flamelink.service';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
 

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  content: any;

  constructor(public navCtrl: NavController, private _fl: FlamelinkService,public logger: EventLoggerProvider) { }

  ngOnInit() {
    this.logger.logButton('ngOnInit',{ pram: "paramValue" })
    this._fl.getApp().content.subscribe('home', { populate: ['banner']}, (error, data) => {
      if (error) {
        console.error(error);
      }

      this.content = data;
    });

  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
