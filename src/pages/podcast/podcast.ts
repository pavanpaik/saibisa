import { Component, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonicPage, NavController, NavParams, Navbar, Content, LoadingController, Events, Platform } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { FlamelinkService } from '../../app/shared/services/flamelink.service';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';

import { Store } from '@ngrx/store';
import { AudioProvider } from '../../providers/audio/audio';
import { CANPLAY, LOADEDMETADATA, PLAYING, TIMEUPDATE, LOADSTART, RESET } from '../../providers/store/store';
import { pluck, filter, map, distinctUntilChanged } from 'rxjs/operators';

import { MusicControls } from '@ionic-native/music-controls';
import { isCordovaAvailable } from '../../common/is-cordova-available';
import { BindingFlags } from '@angular/compiler/src/core';

@IonicPage()
@Component({
  selector: 'page-podcast',
  templateUrl: 'podcast.html',
  animations: [
    trigger('showHide', [
      state(
        'active',
        style({
          opacity: 1
        })
      ),
      state(
        'inactive',
        style({
          opacity: 0
        })
      ),
      transition('inactive => active', animate('250ms ease-in')),
      transition('active => inactive', animate('250ms ease-out'))
    ]),
    trigger('animateState', [
      state('active', style({
        backgroundColor: 'red'
      })),
      state('inactive', style({
        backgroundColor: 'yellow'
      })),
      transition('* => *', animate(2000))
    ])
  ]
})
export class PodcastPage {

  title: string = 'Chords of Consciousness';
  subTitle: string = 'Let us Chant Sai Sai Sai';
  files: any = [];
  seekbar: FormControl = new FormControl("seekbar");
  state: any = {};
  onSeekState: boolean;
  currentFile: any = {};
  displayFooter: string = "inactive";
  loggedIn: Boolean;
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild(Content) content: Content;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public audioProvider: AudioProvider,
    public events: Events,
    public store: Store<any>,
    public _fl: FlamelinkService,
    public logger: EventLoggerProvider,
    private musicControls: MusicControls
  ) {
    platform.ready().then(() => {
      platform.pause.subscribe((result) => {
        //this.pauseSilent();
      });
      platform.resume.subscribe((result) => {
        //this.playSilent();
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PodcastPage');
    // this.pauseSilent();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave PodcastPage');
    //this.pauseSilent();
  }
  ngOnInit() {
    this.logger.setCurrentScreen(this.title);
    // let loader = this.presentLoading();

    this._fl.getApp().content.get('chordsOfConsciousness', { populate: true })
      .then(data => {
        console.log('chordsOfConsciousness, content', data);
        this.processResponse(data);
        // loader.dismiss();
      })
      .catch(error => {
        console.error('chordsOfConsciousness, error', error);
      })

    // this.events.subscribe('pauseAudio', (object) => {
    //   console.log(object);
    //   this.pauseSilent();
    // });

    // this.events.subscribe('freeAudio', (object) => {
    //   this.pauseSilent();
    // });

    // this.events.subscribe('navigationEvent', (object) => {
    //   this.pauseSilent();
    // });

    // this.events.subscribe('tab-switch', (object) => {
    //   this.pauseSilent();
    // });
  }

  processResponse(data: any) {
    try {
      this.title = data.pageTitle;
      this.subTitle = data.subTitle;
      data.songs.forEach((ele) => {
        console.log(ele.song[0].file);
        this.files.push({
          url: ele.song[0].url,
          name: ele.title,
          title: ele.title,
          artist: ele.artist,
          composer: ele.composer,
          lyricist: ele.lyricist,
          newLaunchFlag: !!ele.launchMessage,
          launchMessage: ele.launchMessage,

        });
      });
    } catch (error) {
      console.error('chordsOfConsciousness, error', error);
    }
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Content. Please Wait...'
    });
    loading.present();
    return loading;
  }

  ionViewWillLoad() {
    this.store.select('appState').subscribe((value: any) => {
      this.state = value.media;
    });

    // Resize the Content Screen so that Ionic is aware of footer
    this.store
      .select('appState')
      .pipe(pluck('media', 'canplay'), filter(value => value === true))
      .subscribe(() => {
        this.displayFooter = 'active';
        this.content.resize();
      });

    // Updating the Seekbar based on currentTime
    this.store
      .select('appState')
      .pipe(
        pluck('media', 'timeSec'),
        filter(value => value !== undefined),
        map((value: any) => Number.parseInt(value)),
        distinctUntilChanged()
      )
      .subscribe((value: any) => {
        this.seekbar.setValue(value);
      });
  }

  openFile(file, index) {
    this.logger.logActivityEvent({ page: this.title, action: 'openFile', file: file, index: index });
    this.currentFile = { index, file };
    this.playStream(file.url);
    if (isCordovaAvailable()) {
      this.createLoclScreenControls(file);
    }
  }

  resetState() {
    this.audioProvider.stop();
    this.store.dispatch({ type: RESET });
  }

  playStream(url) {
    this.logger.logActivityEvent({ page: this.title, action: 'playStream', url: url });
    this.resetState();
    this.audioProvider.playStream(url).subscribe(event => {
      const audioObj = event.target;

      switch (event.type) {
        case 'canplay':
          return this.store.dispatch({ type: CANPLAY, payload: { value: true } });

        case 'loadedmetadata':
          return this.store.dispatch({
            type: LOADEDMETADATA,
            payload: {
              value: true,
              data: {
                time: this.audioProvider.formatTime(
                  audioObj.duration * 1000,
                  'HH:mm:ss'
                ),
                timeSec: audioObj.duration,
                mediaType: 'mp3'
              }
            }
          });

        case 'playing':
          return this.store.dispatch({ type: PLAYING, payload: { value: true } });

        case 'pause':
          return this.store.dispatch({ type: PLAYING, payload: { value: false } });

        case 'timeupdate':
          return this.store.dispatch({
            type: TIMEUPDATE,
            payload: {
              timeSec: audioObj.currentTime,
              time: this.audioProvider.formatTime(
                audioObj.currentTime * 1000,
                'HH:mm:ss'
              )
            }
          });

        case 'loadstart':
          return this.store.dispatch({ type: LOADSTART, payload: { value: true } });
      }
    });
  }

  pause() {
    this.logger.logActivityEvent({ page: this.title, action: 'pause' });
    this.audioProvider.pause();
    if (isCordovaAvailable()) {
      this.musicControls.listen();
      this.musicControls.updateIsPlaying(false);
    }
  }

  pauseSilent() {
    try {
      this.logger.logActivityEvent({ page: this.title, action: 'pauseSilent' });
      this.audioProvider.pause();
    } catch (e) { }
  }

  play() {
    if(!this.currentFile.index) {
      this.openFile(this.files[0], 0);
      return;
    }
    this.logger.logActivityEvent({ page: this.title, action: 'play' });
    this.audioProvider.play();
    if (isCordovaAvailable()) {
      this.musicControls.listen();
      this.musicControls.updateIsPlaying(true);
    }
  }

  playSilent() {
    try {
      this.logger.logActivityEvent({ page: this.title, action: 'playSilent' });
      this.audioProvider.play();
    } catch (e) { }
  }

  stop() {
    this.logger.logActivityEvent({ page: this.title, action: 'stop' });
    this.audioProvider.stop();
  }

  next() {
    this.logger.logActivityEvent({ page: this.title, action: 'next' });
    let index = this.currentFile.index + 1;
    let file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    this.logger.logActivityEvent({ page: this.title, action: 'previous' });
    let index = this.currentFile.index - 1;
    let file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSeekStart() {
    this.onSeekState = this.state.playing;
    if (this.onSeekState) {
      this.pause();
    }
  }

  onSeekEnd(event) {
    if (this.onSeekState) {
      this.audioProvider.seekTo(event.value);
      this.play();
    } else {
      this.audioProvider.seekTo(event.value);
    }
  }

  reset() {
    this.resetState();
    this.currentFile = {};
    this.displayFooter = "inactive";
  }

  createLoclScreenControls(track) {
    this.musicControls.create({
      track: track.name,
      artist: track.artist,
      cover: 'assets/imgs/default.png',
      isPlaying: true,
      dismissable: true,
      hasPrev: !this.isFirstPlaying(),
      hasNext: !this.isLastPlaying(),

      // iOS only, optional
      album: 'Absolution',     // optional, default: ''
      duration: 60, // optional, default: 0
      elapsed: 10, // optional, default: 0
      hasSkipForward: false,  // show skip forward button, optional, default: false
      hasSkipBackward: false, // show skip backward button, optional, default: false
      skipForwardInterval: 15, // display number for skip forward, optional, default: 0
      skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
      hasScrubbing: false, // enable scrubbing from control center and lockscreen progress bar, optional

      // Android only, optional
      ticker: `Now playing "${track.name}"`,
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
    });

    this.musicControls.subscribe().subscribe((action) => {
      console.log('action', action);
      const message = JSON.parse(action).message;
      console.log('message', message);
      switch (message) {
        case 'music-controls-next':
          this.next();
          break;
        case 'music-controls-previous':
          this.previous();
          break;
        case 'music-controls-pause':
          // Do something
          console.log('music pause');
          this.pause();
          break;
        case 'music-controls-play':
          // Do something
          console.log('music play');
          this.play();
          break;
        case 'music-controls-destroy':
          this.reset();
          break;
        // External controls (iOS only)
        case 'music-controls-toggle-play-pause':
          // Do something
          break;
        case 'music-controls-seek-to':
          // Do something
          break;
        case 'music-controls-skip-forward':
          // Do something
          break;
        case 'music-controls-skip-backward':
          // Do something
          break;

        // Headset events (Android only)
        // All media button events are listed below
        case 'music-controls-media-button':
          // Do something
          break;
        case 'music-controls-headset-unplugged':
          break;
        case 'music-controls-headset-plugged':
          // Do something
          break;
        default:
          break;
      }
    });
    this.musicControls.listen(); // activates the observable above
    this.musicControls.updateIsPlaying(true);
  }
}
