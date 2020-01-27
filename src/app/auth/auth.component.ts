import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../core/services/user.service';
import {AuthUser, User} from '../core/interfaces/User';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  color = 'primary';
  checked = false;
  signUpForm;
  signInForm;

  private authValidate = new BehaviorSubject<boolean>(true);
  private signUpValidate = new BehaviorSubject<boolean>(true);

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.signUpForm = formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required
      ]],
      fullName: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      username: ['', [
        Validators.required
      ]],
    });

    this.signInForm = formBuilder.group({
      id: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  checkAuthForm() {
    this.authValidate.next(
      !(this.signInForm.get('username').errors === null
      && this.signInForm.get('password').errors === null
      && this.signInForm.get('id').errors === null));
  }

  checkSignUpForm() {
    this.signUpValidate.next(
      !(this.signUpForm.get('username').errors === null
      && this.signUpForm.get('password').errors === null
      && this.signUpForm.get('fullName').errors === null
      && this.signUpForm.get('phone').errors === null
      && this.signUpForm.get('email').errors === null));
  }

  SignUp() {
    const user = this.signUpForm.getRawValue() as User;
    this.userService.createUser(user);
  }


  SignIn() {
    const user = this.signInForm.getRawValue() as AuthUser;
    console.log(this.signInForm.get('username').errors);
  }

}
