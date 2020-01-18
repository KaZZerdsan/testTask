import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  showPath(event) {
    console.log(event);
  }

  constructor(
    private http: HttpClient) {
  }

  ngOnInit() {
    const headers = new HttpHeaders();
    headers.append('Access', '*/*');
    this.http.get('http://gallery.dev.webant.ru/api/photos?page=1&limit=1', {headers})
      .subscribe(data => console.log(data));
  }
}
