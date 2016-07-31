import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, Validators } from '@angular/forms';
import {
  BS_VIEW_PROVIDERS,
  MODAL_DIRECTIVES,
  ModalDirective
} from 'ng2-bootstrap/ng2-bootstrap';
import { FaDirective } from 'angular2-fontawesome/directives';
import { AuthService } from '../../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-login-modal',
  templateUrl: 'login-modal.component.html',
  styleUrls: ['login-modal.component.css'],
  directives: [
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
    ROUTER_DIRECTIVES,
    MODAL_DIRECTIVES,
    FaDirective
  ],
  viewProviders: [BS_VIEW_PROVIDERS]
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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  handleLogin(): void {
    this.modal.show();
  }

  logInWithEmailPassword(): void {
    if (this.loginForm.valid) {
      // TODO: Indicate loading?
      // let email = this.emailControl.value;
      // let password = this.passwordControl.value;
      this.authService.logInWithEmailPassword(this.email, this.password).then(
          () => {
            this.modal.hide();
          },
          err => {
            this.loginForm.setErrors({ invalidEmailOrPassword: true });
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
    this.loginForm.setErrors({});
  }
}
