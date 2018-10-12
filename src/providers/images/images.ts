import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ImagesProvider {

  images: any;

  constructor(public http: HttpClient) {
    console.log('Hello ImagesProvider Provider');
  }

  set(images: any) {
    this.images = images;
  }

  get() {
    return this.images;
  }

}
