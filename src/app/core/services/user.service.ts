import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthClient, SignUpClient, User, Token, AuthUser} from '../interfaces/User';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {JwtService} from './jwt.service';
import {map} from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private jwtService: JwtService) { }

  createClient(username: string) {
    const newClient = {} as SignUpClient;
    newClient.name = username;
    return this.apiService.post(environment.client, newClient, false);
  }

  createUser(user: User) {
    let client;
    this.createClient(user.username)
      .subscribe((res: AuthClient) => {
        client = res;
        console.log(res);
      });
    this.apiService.post(environment.user, user, false)
      .subscribe((data: User) => {
          console.log(data);
          this.getToken(client, user)
            .subscribe((token: Token) => {
              this.setAuth(user, client, token);
              console.log(token);
            });
      });
  }

  getClient(id: string) {
    return this.apiService.get(environment.client + '/' + id);
  }

  authorization(authUser: AuthUser) {
    const req = {
      client_id: '',
      grant_type: 'password',
      password: authUser.password,
      username: authUser.username,
      client_secret: ''
    };
    this.getClient(authUser.id)
      .subscribe((client: AuthClient) => {
        req.client_id = client.id + '_' + client.randomId;
        req.client_secret = client.secret;
      });
  }

  getToken(client: AuthClient, user: User) {
    const req = {
      client_id: client.id + '_' + client.randomId,
      grant_type: 'password',
      password: user.password,
      username: user.username,
      client_secret: client.secret
    };
    return this.apiService.post(environment.token, req, true);
  }

  setAuth(user: User, client: AuthClient, token: Token) {
    this.jwtService.saveToken(token.refresh_token, token.access_token);
    this.setClient(client);
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(user);
  }

  setClient(client: AuthClient) {
    localStorage.setItem('clientId', client.id + '_' + client.randomId);
    localStorage.setItem('clientSecret', client.secret);
  }

  purgeClient() {
    localStorage.removeItem('clientId');
    localStorage.removeItem('clientSecret');
  }

  purgeAuth() {
    this.purgeClient();
    this.jwtService.purgeToken();
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next({} as User);
  }
}
