import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken() {
    return localStorage.getItem('token');
  }

  saveToken(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  purgeToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  constructor() { }
}
