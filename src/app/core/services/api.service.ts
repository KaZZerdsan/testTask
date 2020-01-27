import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams,} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 constructor(public http: HttpClient) {
 }
 options = {
    headers: new HttpHeaders()
      .set('Accept', 'application/json')
      // .set('Access-Control-Allow-Origin', '*')
      };

 post(path: string, body: object, authorized: boolean) {
   const token = localStorage.getItem('accessToken');
   const headers = this.options;
   if (authorized) { headers.headers.append('Authorization', 'Bearer ' + token); }
   return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), headers);
   }

 get(path: string) {
   return this.http.get(`${environment.api_url}${path}`);
   }
}
