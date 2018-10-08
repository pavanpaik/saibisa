import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { FlamelinkService } from '../../app/shared/services/flamelink.service';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
import { SplashScreen } from '@ionic-native/splash-screen';

@IonicPage()
@Component({
  selector: 'page-initiatives',
  templateUrl: 'initiatives.html',
})
export class InitiativesPage {
  title: string = 'Initiatives';
  heroImage: string;
  content: string;

  initiatives: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public _fl: FlamelinkService,
    public logger: EventLoggerProvider,
    public splashScreen: SplashScreen,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitiativesPage');
  }

  ngOnInit() {
    this.logger.setCurrentScreen(this.title);

    let options = {
      populate: [
        {
          field: 'heroImage'
        },
        {
          field: 'initiatives',
          subFields: ['initiativeThumnail', 'initiativeArticle']
        }
      ]
    };
    this._fl.getApp().content.get('initiativesPage', options)
      .then(data => {
        console.log('initiativesPage, content', data);
        this.processResponse(data);
      })
      .catch(error => {
        console.log('initiativesPage, error', error);
      })
  }

  popValue(ary: any, key: string, defult: any) {
    return (ary[0] && ary[0][key]) ? ary[0][key] : defult;
  }

  processResponse(data) {
    try {
      this.heroImage = data.heroImage[0].url;
      this.title = data.pageTitle; //title
      this.content = data.content
      let temp: any = [];
      data.initiatives.forEach((element) => {
        temp.push({
          id: element.initiativeArticle[0].id,
          thumbnail: this.popValue(element.initiativeThumnail, 'url', null),
          title: element.initiativeArticle[0].title,
          excerpt: element.initiativeArticle[0].excerpt
        });
      })
      this.initiatives = temp;
    } catch (error) {
      console.log('initiativesPage, error', error);
    }
  }
  openModal(article) {
    console.log('Opening article', article)
    // this.modalCtrl.create(ArticleComponent, {
    // 	postId: post.id,
    // 	modal: true
    // }).present();
  }
}
