import { Component, OnInit } from '@angular/core';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { emailValidator, matchingPasswordValidator } from './validators';
import { User, AuthService, UserService } from '../shared';

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
  emailControl = new FormControl('', Validators.compose([
    Validators.required,
    emailValidator
  ]));
  passwordControl = new FormControl('', Validators.required);
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
    // validate password = password
    // this.authService.registerWithEmailPassword(this.email, this.password);
  }
}
