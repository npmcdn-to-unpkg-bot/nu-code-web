import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginModalComponent } from '../../login-modal';
import { AuthService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-auth-area',
  templateUrl: 'auth-area.component.html',
  styleUrls: ['auth-area.component.css'],
  directives: [LoginModalComponent]
})
export class AuthAreaComponent implements OnInit {
  @ViewChild('loginModal') loginModal: LoginModalComponent;

  // Needed to access current user
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logIn(): void {
    // Deferred to the login modal
    this.loginModal.handleLogin();
  }

  logOut(): void {
    this.authService.logOut();
  }
}
