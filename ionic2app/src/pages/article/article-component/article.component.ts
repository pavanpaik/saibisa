import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Events, MenuController } from 'ionic-angular';
import { WordpressService } from '../../../app/shared/services/wordpress.service';
import { WordpressPost } from '../../wordpress/wordpress-post/wordpress-post.component';

@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
  providers: [
    WordpressService
  ]
})
export class ArticleComponent {
	postId: Number;
	category: any;
	page: any;
	gallery: any;
	media: any;
	posts: any;
	pageCount: number;
	
  constructor(public navController: NavController,
    private loadingController: LoadingController,
		private menuController: MenuController,
    private events: Events,
    private navParams: NavParams,
		private wordpressService: WordpressService,
		private toastController: ToastController) { }

  ngOnInit() {
		
		if (this.navParams.get('postId')) {
			this.postId = this.navParams.get('postId');
			this.getPage(this.postId);
			this.getPageGalleryImages(this.postId);
		} else {
			this.page = null;
			this.media = null;
		}
		
		if (this.navParams.get('postListId')) {
			this.category = this.navParams.get('postListId');
			this.getPosts();
		} else {
			this.posts = null;
		}
  }

  getPageGalleryImages(id) {
		this.wordpressService.getPostGallery(id)
      .subscribe(result => {
        this.gallery = result;
      },
        error => console.log(error));
	}

  getPage(id) {
    let loader = this.loadingController.create({
      content: "Please wait"
    });

    loader.present();
    this.wordpressService.getPost(id)
      .subscribe(result => {
        this.page = result;
        if (result) {
          this.getMedia(result.featured_media);
        }
      },
        error => console.log(error),
        () => loader.dismiss());
  }

  getMedia(id) {
    this.wordpressService.getMedia(id)
      .subscribe(result => {
        this.media = result;
      });
	}
	
	getPosts() {
		this.pageCount = 1;

		let query = this.createQuery();
		let loader = this.loadingController.create({
			content: "Please wait",
      duration: 10000
		});

		loader.present();
		this.wordpressService.getPosts(query)
		.subscribe(result => {
      // this.posts = result;
      let posts = result

      for(var i=0; i < posts.length; i++) { 
        try {
          posts[i].featImgSrc = posts[i]._embedded["wp:featuredmedia"][0].source_url
        } catch(e) {}
      }
      this.posts = posts;

      loader.dismiss();
		});
	}

	loadMore(infiniteScroll) {
		this.pageCount++;

		let query = this.createQuery();
		let toast = this.toastController.create({
			message: "There are no more posts.",
			duration: 2000
		});

		this.wordpressService.getPosts(query)
		.subscribe(result => {
				infiniteScroll.complete();
				if(result.length < 1) { 
					infiniteScroll.enable(false);
					toast.present();
				} else {
					this.posts = this.posts.concat(result);
				}
			},
			error => {
				infiniteScroll.enable(false);
				toast.present();
				console.log(error)
			},
		() => {
    });
	}

	loadPost(post) {
		this.navController.push(WordpressPost, {
			id: post.id
		});
	}

	createQuery() {
		let query = {};
		query['page'] = this.pageCount;
		if(this.category) {
			query['categories'] = this.category;
		}
		return query;
	}
}
