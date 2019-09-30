import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Slides } from 'ionic-angular';

import { FlamelinkService } from '../../app/shared/services/flamelink.service';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';

import { PhotoViewer } from '@ionic-native/photo-viewer';

import { ImagesProvider } from '../../providers/images/images';

@IonicPage()
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {

  title: string = 'Article';
  heroImage: string;
  content: string;
  disclaimer: boolean;
  disclaimerText: string;

  imageDeck: any;
  currentIndex:number = 0;

  posts: any;
  
  modal: boolean;

  articleId: string;

  @ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _fl: FlamelinkService,
    public logger: EventLoggerProvider,
    public images: ImagesProvider,
    private photoViewer: PhotoViewer,
    public modalCtrl : ModalController) {

    this.articleId = navParams.get('articleId');

		if (this.navParams.get('modal')) {
			this.modal = true;
		} else {
			this.modal = false;
		}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
  }

  ngOnInit() {
    this.logger.setCurrentScreen(this.title);

    //{ populate: true }
    let options = {
      populate: [
        {
          field : 'heroImage'
        },
        {
          field : 'imageDeck',
          subFields: [ 'image' ]
        },
        {
          field : 'posts',
          subFields: [ 'thumbnail' ]
        }
      ]
    };
    this._fl.getApp().content.get('article', this.articleId, options)
      .then(data => {
        console.log('articlePage, content', data);
        this.handleResponse(data);
      })
      .catch(error => {
        console.error('articlePage, error', error);
      })
  }

  handleResponse(data) {
    try {
      this.title = data.title;
      this.content = data.content;
      if (data.heroImage && data.heroImage.length > 0) {
        this.heroImage = data.heroImage[0].url;
      }

      if (data.imageDeck && data.imageDeck.length > 0) {
        let temp: any = [];
        data.imageDeck.forEach((element) => {
          temp.push({
            image: this.popValue(element.image, 'url', 'assets/imgs/default.png'),
            title: element.title,
            description: element.description,
          });
          // console.log('articlePage, temp', temp);
        })
        this.imageDeck = temp;
      }
      this.images.set(this.imageDeck);

      if (data.posts && data.posts.length > 0) {
        let temp1: any = [];
        data.posts.forEach((element) => {
          temp1.push({
            thumbnail: this.popValue(element.thumbnail, 'url', 'assets/imgs/default.png'),
            articleId: element.article,
            description: element.excerpt
          });
        })
        this.posts = temp1;
        // console.log('articlePage, temp1', temp1);
      }

      if(data.disclaimerText) {
        this.disclaimer = true;
        this.disclaimerText = data.disclaimerText;
      } else {
        this.disclaimer = false;
        this.disclaimerText = '';
      }
    } catch (error) {
      console.log('articlePage, error', error);
    }
  }

  popValue(ary: any, key: string, defult: any) {
    return (ary[0] && ary[0][key]) ? ary[0][key] : defult;
  }

  loadPost(post) {
    this.logger.logActivityEvent({ page: 'ArticlePage', action: 'loadPost', articleId: post.articleId });
    this.modalCtrl.create('ArticlePage', {
      articleId: post.articleId,
      modal: true
		}).present();
  }

	closeModal() {
		this.navCtrl.pop();
  }
  
  openImage(imgUrl) {
		this.photoViewer.show(imgUrl);
  }

  openImageSlider(index) {
    this.logger.logActivityEvent({ page: 'ArticlePage', action: 'openImageSlider', index: index });
    this.modalCtrl.create('ImageSliderPage', {
      index: index
		}).present();
  }

  onSlideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    console.log('Slide changed! Current index is', this.currentIndex);
  }

  nextSlide() {
    this.slides.slideNext();
  }
  
  previousSlide() {
    this.slides.slidePrev();
  }
}
