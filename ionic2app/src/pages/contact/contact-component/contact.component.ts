import { Component } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';
import { Config } from '../../../app/app.config';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactComponent {
  email: {subject: string, body: string} = {
    subject: '',
    body: ''
  };

  constructor(
  	private config: Config,
    private emailComposer: EmailComposer
  ) {}

  sendEmail() {
  	let email = {
  		to: this.config.emailTo,
  		cc: '',
  		bcc: '',
  		attachments: [],
  		subject: this.email.subject,
  		body: this.email.body,
  		isHtml: true
  	};
  	this.emailComposer.open(email);
  }

}
