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
    ])
  ]
})
export class PodcastPage {

  title: string = 'Chords of Consciousness';
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
    public logger: EventLoggerProvider
  ) {
    platform.ready().then(() => {
      platform.pause.subscribe((result) => {
        this.pauseSilent();
      });
      platform.resume.subscribe((result) => {
        this.playSilent();
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PodcastPage');
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

    this.events.subscribe('pauseAudio', (object) => {
      console.log(object);
      this.pauseSilent();
    });

    // this.events.subscribe('navigationEvent', (object) => {
    //   this.pauseSilent();
    // });

    // this.events.subscribe('tabinationEvent', (object) => {
    //   this.pauseSilent();
    // });
  }

  processResponse(data: any) {
    try {
      this.title = data.pageTitle;
      data.songs.forEach((ele) => {
        console.log(ele.song[0].file);
        this.files.push({
          url: ele.song[0].url,
          name: ele.title
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
  }

  pauseSilent() {
    try {
      this.logger.logActivityEvent({ page: this.title, action: 'pauseSilent' });
      this.audioProvider.pause();
    } catch (e) { }
  }

  play() {
    this.logger.logActivityEvent({ page: this.title, action: 'play' });
    this.audioProvider.play();
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
}
