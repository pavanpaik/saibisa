import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavParams, Platform, Events } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Config } from '../../../app/app.config';

@Component({
	templateUrl: './youtube-channel-video.html'
})
export class YoutubeChannelVideoComponent {
	video: any;
	videoUrl: any;
	youtubeUrl: string;
	
	constructor(
		private navParams: NavParams,
		private sanitizer: DomSanitizer,
		private socialSharing: SocialSharing,
		private config: Config,
		private events: Events,
		platform: Platform) {
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

	ngOnInit() {
		this.events.subscribe('navigationEvent',(object) => {
			this.onPause();
		});

		this.events.subscribe('tabinationEvent',(object) => {
			this.onPause();
		});
	}
	onPause() {
		this.callPlayer("youtubeChannelPlayer", "pauseVideo");
		//this.window.callPlayer("youtubeChannelPlayer", "stopVideo");
	}

	onResume() {
		this.callPlayer("youtubeChannelPlayer", "playVideo");
	}
	prepareResource() {
		let url = this.youtubeUrl + 'embed/' + this.video.id.videoId + '?enablejsapi=1&modestbranding=1&rel=0&showinfo=0';
		this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	callPlayer(frame_id, func) {
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

	shareVideo() {
		let subject = this.video.snippet.title;
		let message = this.video.snippet.description;
		message = message.replace(/(<([^>]+)>)/ig, "");
		let url = this.youtubeUrl + 'embed/' + this.video.id.videoId;

		setTimeout(() => this.socialSharing.share(message, subject, '', url), 0);
	}

}
