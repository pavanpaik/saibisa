import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { FlamelinkService } from '../../app/shared/services/flamelink.service';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
import { SplashScreen } from '@ionic-native/splash-screen';

import { YoutubeService } from './services/youtube.service';
import { ModalContentPage } from './modal/modal';

@IonicPage()
@Component({
  selector: 'page-youtube',
  templateUrl: 'youtube.html',
  providers: [YoutubeService]
})
export class YoutubePage {
  title: string = 'Youtube';
  heroImage: string;
  content: string;

  videos: any;
  loader: any;

  constructor(
    public youtubeService: YoutubeService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public _fl: FlamelinkService,
    public logger: EventLoggerProvider,
    public splashScreen: SplashScreen,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YoutubePage');
  }

  ngOnInit() {
    this.logger.setCurrentScreen(this.title);

    this._fl.getApp().content.subscribe('youtubePage', { populate: true }, (error, data) => {
      if (error) {
        console.error(error);
      }
      console.log('youtubePage, content', data);
      try {
        this.getChannel();
        this.title = data.pageTitle;
        this.content = data.content;
        if (data.heroImage && data.heroImage.length > 0) {
          this.heroImage = data.heroImage[0].url;
        }
      } catch (e) {
        console.log('youtubePage, error', e);
      }
    });

  }

  getChannel() {
    this.youtubeService.getChannel()
      .subscribe(result => {
        this.videos = result.items;
      }, error => {
      },
        () => { }
      );
  }

  loadVideo(video) {
    this.modalCtrl.create(ModalContentPage, {
      video: video
    }).present();
  }
}
