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
          subFields: ['initiativeThumnail', 'initiativeArticle'],
          populate: ['initiativeArticle']
        }
      ]
    };
    this._fl.getApp().content.get('initiativesPage', options)
      .then(data => {
        console.log('initiativesPage, content', data);

        //////

        this.heroImage = data.heroImage[0].url;
        this.title = data.pageTitle; //title
        this.content = data.content
        
        let temp:any = [];
        data.initiatives.forEach((element) => {
          temp.push({
            thumbnail: element.initiativeThumnail[0].url,
            title: element.initiativeArticle[0].title,
            excerpt: element.initiativeArticle[0].excerpt
          });
        })
        this.initiatives = temp;
        ///////
      })
      .catch(error => {
        console.log('initiativesPage, error', error);
      })

    // this._fl.getApp().content.subscribe('initiativesPage', { populate: true }, (error, data) => {
    //   if (error) {
    //     console.error(error);
    //   }
    //   console.log('initiativesPage, content', data);
    //   try {
    //     this.title = data.pageTitle;
    //     this.content = data.content;
    //     if(data.heroImage && data.heroImage.length > 0) {
    //       this.heroImage = data.heroImage[0].url;
    //     }
    //   } catch (e) {
    //     console.log('initiativesPage, error', e);
    //   }
    // });
  }
}
