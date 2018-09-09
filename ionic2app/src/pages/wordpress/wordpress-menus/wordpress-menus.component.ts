import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WordpressService } from '../shared/services/wordpress.service';
import { WordpressMenu } from '../wordpress-menu/wordpress-menu.component';

@Component({
	templateUrl: './wordpress-menus.html',
	providers: [ WordpressService ]
})
export class WordpressMenus {

	menus: any;

	constructor(
		private wordpressService: WordpressService,
		private navController: NavController,
		private loadingController: LoadingController,
		private storage: Storage) {}

	ngOnInit() {
		this.getMenus();
	}

	getMenus() {
		let loader = this.loadingController.create({
			content: "Please wait"
		});

		loader.present();
		this.wordpressService.getMenus()
		.subscribe(result => {
			this.menus = result;
			loader.dismiss();
		});
	}

	loadMenu(menu) {
		this.navController.push(WordpressMenu, {
			title: menu.name,
			id: menu.ID
		});
	}

}
