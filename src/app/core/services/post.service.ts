import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Post, ShowImage} from '../interfaces/Posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  getPhotosByPage(page: number) {
    const options = {
      params: new HttpParams().set('page', String(page)).set('limit', '10'),
      headers: new HttpHeaders().set('Accept', 'application/json')
    };
    return this.http.get(`${environment.api_url}${environment.photos}`, options);
  }

  setPhotos(array, posts: Post[]) {
    array = [];
    posts.forEach(post => array.push({
      name: post.name,
      description: post.description,
      url: `${environment.api_url}${environment.photo_url}${post.image.contentUrl}`,
      popular: post.popular
    }));
    return array;
  }
}
