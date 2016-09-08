import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap';

import { AuthService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-login-modal',
  templateUrl: 'login-modal.component.html',
  styleUrls: ['login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  @ViewChild('modal') modal: ModalDirective;

  email: string = '';
  password: string = '';

  emailControl = new FormControl('');
  passwordControl = new FormControl('');
  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl
  });

  constructor(
      private router: Router,
      private authService: AuthService) { }

  ngOnInit() {
  }

  show(): void {
    this.modal.show();
  }

  private shouldRedirectHome(url: string): boolean {
    return url.includes('/login-required')
        || url.includes('/register')
        || url.includes('/reset-password')
        || url.includes('/usermgmt');
  }

  logInWithEmailPassword(): void {
    if (this.loginForm.valid) {
      // TODO: Indicate loading
      this.authService.logInWithEmailPassword(this.email, this.password).then(
        () => {
          let url = this.router.url;
          if (this.shouldRedirectHome(url)) {
            this.router.navigateByUrl('/');
          }
          this.modal.hide();
        },
        err => {
          let error;
          switch (err.code) {
            case 'auth/user-not-found':
            case 'auth/invalid-email':
            case 'auth/wrong-password':
              error = { invalidEmailOrPassword: true };
              break;
            case 'auth/network-request-failed':
              error = { serverUnreachable: true };
              break;
            case 'auth/too-many-requests':
              error = { tooManyRequests: true };
              break;
            default:
              error = { unexpectedError: true };
              break;
          }
          this.loginForm.setErrors(error);
          console.error(err);
        });
      this.password = '';
    }
  }

  cancel(): void {
    this.modal.hide();
  }

  onHide(): void {
    this.email = '';
    this.password = '';
    this.loginForm.setErrors({});
  }
}
