import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';

import { FlamelinkService } from '../../app/shared/services/flamelink.service';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
import { SplashScreen } from '@ionic-native/splash-screen';

import { YoutubeService } from './services/youtube.service';

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

  playlistId: string;

  videos: any;
  loader: any;

  constructor(
    public youtubeService: YoutubeService,
    public navParams: NavParams,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public events: Events,
    public _fl: FlamelinkService,
    public logger: EventLoggerProvider,
    public splashScreen: SplashScreen,
  ) { 
    
    this.playlistId = navParams.get('playlistId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YoutubePage');
    // this.events.publish('pauseAudio', {reason:'entering videos page'});
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
    // this.youtubeService.getChannel()
    this.youtubeService.getVideos(this.playlistId)
      .subscribe(result => {
        this.videos = result.items;
      }, error => {
      },
        () => { }
      );
  }

  loadVideo(video) {
    this.navCtrl.push('YoutubeVideoPage', {
      video: video
    });
  }
}
