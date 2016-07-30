import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {
  BS_VIEW_PROVIDERS,
  MODAL_DIRECTIVES,
  ModalDirective
} from 'ng2-bootstrap/ng2-bootstrap';
import { FaDirective } from 'angular2-fontawesome/directives';
import { AuthService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-login-modal',
  templateUrl: 'login-modal.component.html',
  styleUrls: ['login-modal.component.css'],
  directives: [
    MODAL_DIRECTIVES,
    FaDirective
  ],
  viewProviders: [BS_VIEW_PROVIDERS]
})
export class LoginModalComponent implements OnInit {
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('loginForm') loginForm: NgForm;

  email: string;
  password: string;

  failed: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  handleLogin(): void {
    this.modal.show();
  }

  logInWithEmailPassword(): void {
    if (this.loginForm.valid) {
      this.failed = false;
      // Show spinner
      this.authService.logInWithEmailPassword(this.email, this.password).then(
          () => {
            this.modal.hide();
          },
          err => {
            this.failed = true;
            this.password = '';
            console.log(err);
          });
    }
  }

  cancel(): void {
    this.modal.hide();
  }

  onHide(): void {
    this.email = '';
    this.password = '';
  }

  goToRegister(): void {
    this.router.navigateByUrl('/register');
    this.modal.hide();
  }

}
