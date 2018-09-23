import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { SharedModule } from './shared/shared.module'
import { HomeModule } from '../pages/home/home.module';
import { TabsModule } from '../pages/tabs/tabs.module';
import { GoogleMapsModule } from '../pages/google-maps/google-maps.module';
import { WordpressModule } from '../pages/wordpress/wordpress.module';
import { SlidesModule } from '../pages/slides/slides.module';
import { GridModule } from '../pages/grid/grid.module';
import { SettingsModule } from '../pages/settings/settings.module';
import { FeedsModule } from '../pages/feeds/feeds.module';
import { YoutubeModule } from '../pages/youtube/youtube.module';
import { AboutModule } from '../pages/about/about.module';
import { DonateModule } from '../pages/donate/donate.module';
import { HealingModule } from '../pages/healing/healing.module';
import { ContactModule } from '../pages/contact/contact.module';
import { DatetimeModule } from '../pages/datetime/datetime.module';
import { RangesModule } from '../pages/ranges/ranges.module';
import { ActionSheetModule } from '../pages/action-sheet/action-sheet.module';
import { FacebookConnectModule } from '../pages/facebook-connect/facebook-connect.module';
import { LoginModule } from '../pages/login/login.module';
import { ChartsModule } from '../pages/charts/charts.module';
import { FirebaseModule } from '../pages/firebase/firebase.module';
// Module Example: Use the PlaceholderModule for any new App Module
import { PlaceholderModule } from '../pages/placeholder/placeholder.module';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from './app.firebase.config';
// import { FlamelinkService } from './shared/services/flamelink.service';

import { OneSignal } from '@ionic-native/onesignal';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    SharedModule,
    HomeModule,
    TabsModule,
    GoogleMapsModule,
    WordpressModule,
    SlidesModule,
    GridModule,
    SettingsModule,
    FeedsModule,
    YoutubeModule,
    AboutModule,
    DonateModule,
    HealingModule,
    ContactModule,
    DatetimeModule,
    RangesModule,
    ActionSheetModule,
    FacebookConnectModule,
    LoginModule,
    ChartsModule,
    FirebaseModule,
    PlaceholderModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OneSignal,
    // FlamelinkService
  ]
})
export class AppModule {}
