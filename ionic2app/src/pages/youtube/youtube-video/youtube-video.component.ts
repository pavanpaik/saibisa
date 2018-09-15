import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Config } from '../../../app/app.config';

@Component({
	templateUrl: './youtube-video.html'
})
export class YoutubeVideoComponent {
	video: any;
	videoUrl: any;
	youtubeUrl: string;

	constructor(
		private navParams: NavParams,
		private sanitizer: DomSanitizer,
		private socialSharing: SocialSharing,
		private config: Config) {
		this.video = navParams.get('video');
		this.youtubeUrl = config.youtubeUrl;
		this.prepareResource();

	}

    prepareResource () {
    	let url = this.youtubeUrl + 'embed/' + this.video.snippet.resourceId.videoId;
		this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
	
	shareVideo() {
		let subject = this.video.snippet.title;
        let message = this.video.snippet.description;
        message = message.replace(/(<([^>]+)>)/ig,"");
        let url = this.youtubeUrl + 'embed/' + this.video.snippet.resourceId.videoId;
		setTimeout(() => this.socialSharing.share(message, subject, '', url), 250);
	}

}
