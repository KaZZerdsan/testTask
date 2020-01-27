import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post, Posts, ShowImage} from '../core/interfaces/Posts';
import {PostService} from '../core/services/post.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  currentPage = 1;
  failPic = 'assets/img/whoops.png';
  pictures = [];
  isShowing = false;
  pageMax = 1;
  picToShow: ShowImage;

  setPictures(page: number) {
    if (page >= 1 && page <= this.pageMax) {
      this.currentPage = page;
      this.post.getPhotosByPage(this.currentPage)
        .subscribe((response: Posts) => {
            this.pictures = this.post.setPhotos(this.pictures, response.data);
            console.log(this.pictures);
            this.pageMax = response.countOfPages;
          }
        );
    }
  }

  showPicture(picture: ShowImage) {
    this.picToShow = picture;
    this.isShowing = true;
  }

  constructor(private http: HttpClient,
              private post: PostService) {
  }

  ngOnInit() {
    this.setPictures(1);
  }
}
