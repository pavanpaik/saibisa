import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, LoadingController, ToastController, Events, MenuController } from 'ionic-angular';
import { WordpressService } from '../../../app/shared/services/wordpress.service';
import { YoutubeChannelComponent } from '../../youtube/youtube-channel/youtube-channel.component';
import { WordpressPosts } from '../../wordpress/wordpress-posts/wordpress-posts.component';
import { WordpressPost } from '../../wordpress/wordpress-post/wordpress-post.component';
import { WordpressFeatureMedia } from '../../wordpress/wordpress-feature-media/wordpress-feature-media.component';
// import { FlamelinkService } from '../../../app/shared/services/flamelink.service';


import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
  providers: [
    WordpressService,
    // FlamelinkService
  ]
})
export class ActivityComponent {
  page: any;
  media: any;
  postId: Number = 1152;
  
  activitiesPageComponent: any = WordpressPosts;
  activitiesPageParam: any = { category: { name: 'Activities', id: 10 } };

  
  posts: any;
	pageCount: number;
	category: any;
	tag: any;
	author: any;
	search: string;
	hideSearchbar: boolean;
  favoritePosts: any;
  

  constructor(public navController: NavController,
    // private flamelinkService: FlamelinkService,
    private loadingController: LoadingController,
		private menuController: MenuController,
    private events: Events,
    
    private navParams: NavParams,
		private wordpressService: WordpressService,
		private toastController: ToastController,
    private storage: Storage
    
    ) { }

  ngOnInit() {
    this.getPage(this.postId);
    this.category = this.activitiesPageParam.category;
    this.tag = this.navParams.get('tag');
		this.author = this.navParams.get('author');
		this.hideSearchbar = true;
		this.search = '';
		this.favoritePosts = [];
	    this.storage.get('wordpress.favorite')
	    .then(data => {
	        if(data) {
	        	this.favoritePosts = JSON.parse(data);
	        }
	    });
		this.getPosts();
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

	getAuthorPosts(author) {
		this.author = author;
		this.getPosts();
	}

	searchPosts() {
    	this.getPosts();
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
			post: post
		});
	}

	favoritePost(post) {
	    let newPost:Boolean = true;
	    let message:string;

	    this.favoritePosts.forEach(favPost => {
			if(JSON.stringify(favPost) === JSON.stringify(post)) {
				newPost = false;
			}
	    });
	    
	    if(newPost) {
			this.favoritePosts.push(post);
			this.storage.set('wordpress.favorite', JSON.stringify(this.favoritePosts));
			message = "This post has been saved to your list";
	    } else {
	    	message = "This post is already in your list";
	    }
		let toast = this.toastController.create({
			message: message,
            duration: 2000
		});
	    toast.present();
	}

	toggleSearchbar() {
		this.hideSearchbar = !this.hideSearchbar;
	}

	createQuery() {
	let query = {};
	query['page'] = this.pageCount;
	if(this.search) {
	 	query['search'] = this.search;
	}
	if(this.category) {
		query['categories'] = this.category.id;
	}
	if(this.tag) {
		query['tags'] = this.tag.id;
	}
	if(this.author) {
		query['author'] = this.author;
	}
	return query;
	}
}
