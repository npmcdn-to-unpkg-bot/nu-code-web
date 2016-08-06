import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { BS_VIEW_PROVIDERS, MODAL_DIRECTIVES, ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { FaDirective } from 'angular2-fontawesome/directives';
import { emailValidator, matchingPasswordValidator } from './validators';
import { AuthService, User } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  directives: [
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
    MODAL_DIRECTIVES,
    ModalDirective,
    FaDirective
  ],
  viewProviders: [BS_VIEW_PROVIDERS]
})
export class RegisterComponent implements OnInit {
  nameControl = new FormControl('', Validators.required);
  emailControl = new FormControl('', [
    Validators.required,
    emailValidator
  ]);
  passwordControl = new FormControl('', [
    Validators.required,
    // As required by firebase
    Validators.minLength(6)
  ]);
  confirmPasswordControl = new FormControl('', Validators.required);

  registerForm = new FormGroup({
    name: this.nameControl,
    email: this.emailControl,
    password: this.passwordControl,
    confirmPassword: this.confirmPasswordControl
  }, {}, matchingPasswordValidator('password', 'confirmPassword'));

  @ViewChild('modal') modal: ModalDirective;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    let user: User = {
      name: this.nameControl.value,
      email: this.emailControl.value
    };
    let password = this.passwordControl.value;
    this.authService.registerNewUser(user, password).then(
        () => this.modal.show(),
        err => {
          switch (err.code) {
            case 'auth/email-already-in-use':
              this.emailControl.setErrors({ emailAlreadyInUse: true });
              break;
            case 'auth/invalid-email':
              this.emailControl.setErrors({ invalidEmail: true });
              break;
            default:
              this.registerForm.setErrors({ unexpectedError: err });
              console.error(err);
              break;
          }
        });
  }

  isNeumontEmail(): boolean {
    return this.emailControl.value.endsWith('neumont.edu');
  }

  isFacultyEmail(): boolean {
    return this.emailControl.value.endsWith('@neumont.edu');
  }

  onModalHide(): void {
    this.router.navigateByUrl('/');
  }
}
