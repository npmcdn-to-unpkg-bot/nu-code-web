import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { AuthService, LoginModalService, User } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-auth-area',
  templateUrl: 'auth-area.component.html',
  styleUrls: ['auth-area.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AuthAreaComponent implements OnInit {
  user: User;

  constructor(
      private router: Router,
      private authService: AuthService,
      private loginModalService: LoginModalService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
  }

  logIn(): void {
    // Deferred to the login modal
    this.loginModalService.show();
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/');
  }
}
