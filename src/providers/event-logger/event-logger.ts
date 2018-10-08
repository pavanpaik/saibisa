import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';

import { isCordovaAvailable } from '../../common/is-cordova-available';

@Injectable()
export class EventLoggerProvider {

  constructor(public http: HttpClient, public firebaseAnalytics: FirebaseAnalytics) {
    if (isCordovaAvailable()) {
      firebaseAnalytics.setEnabled(true)
        .then((res: any) => console.log("Success, setEnabled", res))
        .catch((error: any) => console.error(error));
    }
  }

  logButton(name: string, value: any) {
    if (isCordovaAvailable()) {
      this.firebaseAnalytics.logEvent('page_view', { page: "dashboard" })
        .then((res: any) => console.log("Success, page_view", res))
        .catch((error: any) => console.error(error));
    }
  }

  logActivityEvent(value: any) {
    this.logEvent('activity', value);
  }

  logForceUpdateEvent(value: any) {
    this.logEvent('force-update', value);
  }

  logEvent(name: string, value: any) {
    if (isCordovaAvailable()) {
      this.firebaseAnalytics.logEvent(name, value)
        .then((res: any) => console.log("Success, logEvent", res))
        .catch((error: any) => console.error(error));
    }
  }

  setCurrentScreen(name: string) {
    if (isCordovaAvailable()) {
      this.firebaseAnalytics.setCurrentScreen(name)
        .then((res: any) => console.log("Success, setCurrentScreen", res))
        .catch((error: any) => console.error(error));
    }
  }
}
