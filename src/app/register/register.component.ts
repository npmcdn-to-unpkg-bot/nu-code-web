import { Component, OnInit } from '@angular/core';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { emailValidator, matchingPasswordValidator } from './validators';
import { AuthService, UserService } from '../shared';

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
    private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    let email = this.emailControl.value;
    let password = this.passwordControl.value;
    // Try to create user
    this.authService.registerWithEmailPassword(email, password).then(
        authState => {
          let uid = authState.uid;
          let name = this.nameControl.value;
          this.userService.createUser(uid, { name, email }).then(
            () => console.log('successfully created account and logged in'),
            err => console.log(err));
        },
        err => {
          switch (err.code) {
            case 'auth/email-already-in-use':
              this.emailControl.setErrors({ emailAlreadyInUse: true });
              break;
            case 'auth/invalid-email':
              this.emailControl.setErrors({ invalidEmail: true });
              break;
            default:
              console.error(err);
              break;
          }
        });
  }
}
