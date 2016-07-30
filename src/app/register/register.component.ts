import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { emailValidator, matchingPasswordValidator } from './validators';
import { AuthService, User } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  directives: [
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES
  ]
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

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    let user: User = {
      name: this.nameControl.value,
      email: this.emailControl.value,
    }
    let password = this.passwordControl.value;
    this.authService.registerNewUser(user, password).then(
        () => this.router.navigateByUrl('/'),
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
}
