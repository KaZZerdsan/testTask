export interface SignUpClient {
  'name': string;
  'allowedGrantTypes': ['password'];

}

export interface AuthClient {
  'id': number;
  'name': string;
  'randomId': number;
  'secret': string;
  'allowedGrantTypes': [];
}

export interface User {
  'email': string;
  'phone': string;
  'fullName': string;
  'password': string;
  'username': string;
  'roles': ['user'];
}

export interface AuthUser {
  'id': string;
  'username': string;
  'password': string;
}


export interface Token {
  'access_token': string;
  'refresh_token': string;
}
