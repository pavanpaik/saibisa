import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';

import { isCordovaAvailable } from '../../common/is-cordova-available';

@Injectable()
export class EventLoggerProvider {

  constructor(public http: HttpClient,public firebaseAnalytics: FirebaseAnalytics) {
    console.log('Hello EventLoggerProvider Provider');
    if(isCordovaAvailable()) {
      firebaseAnalytics.setEnabled(true)
      .then((res: any) => console.log("Success, setEnabled",res))
      .catch((error: any) => console.error(error));
    }
  }

  logButton(name:string,value:any){
    if(isCordovaAvailable()) {
      this.firebaseAnalytics.logEvent('page_view', {page: "dashboard"})
      .then((res: any) => console.log("Success, page_view",res))
      .catch((error: any) => console.error(error));
    }
  }
}
