import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { LoginModalComponent } from './login-modal';
import { AuthService, User } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-auth-area',
  templateUrl: 'auth-area.component.html',
  styleUrls: ['auth-area.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    LoginModalComponent
  ]
})
export class AuthAreaComponent implements OnInit {
  user: User;

  @ViewChild('loginModal') loginModal: LoginModalComponent;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
  }

  logIn(): void {
    // Deferred to the login modal
    this.loginModal.show();
  }

  logOut(): void {
    this.authService.logOut();
  }
}
