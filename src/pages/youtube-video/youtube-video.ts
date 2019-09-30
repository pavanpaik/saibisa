import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicPage, NavParams, NavController, Platform, Events } from 'ionic-angular';
import { Config } from '../../app/app.config';

import { EventLoggerProvider } from '../../providers/event-logger/event-logger';

@IonicPage()
@Component({
	selector: 'page-youtube-video',
	templateUrl: 'youtube-video.html',
})
export class YoutubeVideoPage {
	video: any;
	videoUrl: any;
	youtubeUrl: string;

	constructor(
		public navParams: NavParams,
		public navCtrl: NavController,
		public sanitizer: DomSanitizer,
		public config: Config,
		public events: Events,
		public platform: Platform,
		public logger: EventLoggerProvider) {
		this.video = navParams.get('video');
		this.youtubeUrl = config.youtubeUrl;
		this.prepareResource();

		platform.ready().then(() => {
			platform.pause.subscribe((result) => {
				this.onPause();
			});
			platform.resume.subscribe((result) => {
				this.onResume()
			});
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad YoutubeVideoPage');
		// this.events.publish('freeAudio', { reason: 'entering videos page' });
	}

	ionViewWillLeave() {
		console.log('ionViewWillLeave YoutubeVideoPage');
		//this.pauseSilent();
	}
	closeModal() {
		this.navCtrl.pop();
	}

	ngOnInit() {
		this.logger.setCurrentScreen('YoutubeVideo');
		this.events.subscribe('navigationEvent', (object) => {
			this.onPause();
		});

		this.events.subscribe('tab-switch', (object) => {
			this.onPause();
		});
	}

	onPause() {
		this.logger.logActivityEvent({ page: 'YoutubeVideo', action: 'pause' });
		this.callPlayer("youtubeChannelPlayer", "pauseVideo");
	}

	onResume() {
		this.logger.logActivityEvent({ page: 'YoutubeVideo', action: 'resume' });
		this.callPlayer("youtubeChannelPlayer", "playVideo");
	}
	prepareResource() {
		let url = 'https://balticlivecam.com/cameras/india/shirdi/sai-baba-samadhi-mandir/?embed'; //this.youtubeUrl + 'embed/' + this.video.snippet.resourceId.videoId + '?enablejsapi=1&modestbranding=1&rel=0&showinfo=0';
		this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	callPlayer(frame_id, func) {
		this.logger.logActivityEvent({ page: 'YoutubeVideo', action: 'callPlayer' });
		var iframe: any = document.getElementById(frame_id);
		if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
			iframe = iframe.getElementsByTagName('iframe')[0];
		}
		if (iframe) {
			// Frame exists, 
			iframe.contentWindow.postMessage(JSON.stringify({
				"event": "command",
				"func": func,
				"args": [],
				"id": frame_id
			}), "*");
		}
	}
}
