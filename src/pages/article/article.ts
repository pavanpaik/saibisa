import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FlamelinkService } from '../../app/shared/services/flamelink.service';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';

@IonicPage()
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {

  title: string = 'Article';
  heroImage: string;
  content: string;

  imageDeck: any;
  posts: any;
  
  articleId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _fl: FlamelinkService,
    public logger: EventLoggerProvider) {

    this.articleId = navParams.get('articleId');
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
            image: this.popValue(element.image, 'url', 'default-thumbnail'),
            title: element.title,
            description: element.description,
          });
          console.log('articlePage, temp', temp);
        })
        this.imageDeck = temp;
      }

      if (data.posts && data.posts.length > 0) {
        let temp1: any = [];
        data.posts.forEach((element) => {
          temp1.push({
            thumbnail: this.popValue(element.thumbnail, 'url', 'default-thumbnail'),
            articleId: element.article,
            description: element.excerpt
          });
        })
        this.posts = temp1;
        console.log('articlePage, temp1', temp1);
      }
    } catch (error) {
      console.log('articlePage, error', error);
    }
  }

  popValue(ary: any, key: string, defult: any) {
    return (ary[0] && ary[0][key]) ? ary[0][key] : defult;
  }

  loadPost(post) {
    this.navCtrl.push('ArticlePage', {
      articleId: post.articleId
    });
  }
}
