import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SharedModule } from './shared/shared.module'

import { FlamelinkService } from './shared/services/flamelink.service';
import { WordpressService } from './shared/services/wordpress.service';

import { Items } from '../mocks/providers/items';
import { Settings, User, Api } from '../providers';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './app.firebase.config';

import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { EventLoggerProvider } from '../providers/event-logger/event-logger';

import { AudioProvider } from '../providers/audio/audio';
import { StoreModule } from '@ngrx/store';
import { mediaStateReducer } from '../providers/store/store';

import { OneSignal } from '@ionic-native/onesignal';

import { AppVersion } from '@ionic-native/app-version';
import { ImagesProvider } from '../providers/images/images';

import { MusicControls } from '@ionic-native/music-controls';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({
      appState: mediaStateReducer
    }),
    IonicModule.forRoot(MyApp),
    SharedModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    FlamelinkService,
    WordpressService,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseAnalytics,
    EventLoggerProvider,
    AudioProvider,
    OneSignal,
    AppVersion,
    ImagesProvider,
    MusicControls
  ]
})
export class AppModule { }
