import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { matchingPasswordValidator } from '../register/validators';
import { AuthService, LoginModalService } from '../shared';

/**
 * Handles
 * - Password resetting
 * - Email verification
 */
@Component({
  moduleId: module.id,
  selector: 'app-user-management',
  templateUrl: 'user-management.component.html',
  styleUrls: ['user-management.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES
  ]
})
export class UserManagementComponent implements OnInit {
  action: Action;
  state: State;

  oobCode: string;
  passwordControl: FormControl;
  confirmPasswordControl: FormControl;
  resetPasswordForm: FormGroup;
  email: string;

  constructor(
      private router: Router,
      private authService: AuthService,
      private loginModalService: LoginModalService) { }

  ngOnInit() {
    // Grab the needed parameters from the URL
    this.router.routerState.queryParams.subscribe(params => {
      let mode = params['mode'];
      let oobCode = params['oobCode'];
      if (mode && oobCode) {
        this.oobCode = oobCode;
        this.handleEvent(mode);
      } else {
        this.redirectHome();
      }
    });
  }

  private handleEvent(mode: string): void {
    switch (mode) {
      case 'resetPassword':
        this.handlePasswordReset();
        break;
      case 'recoverEmail':
        // TODO:
        break;
      case 'verifyEmail':
        this.action = 'verifyEmail';
        // Await log in
        this.authService.loggedIn.take(1).toPromise().then(loggedIn => {
          if (loggedIn) {
            this.state = 'loading';
            this.authService.verifyEmail(this.oobCode).then(
                () => this.state = 'success',
                err => this.state = 'error');
          }
        });
        break;
      default:
        this.redirectHome();
        break;
    }
  }

  private handlePasswordReset() {
    this.action = 'resetPassword';
    this.state = 'loading';
    this.authService.verifyPasswordResetCode(this.oobCode).then(
        email => {
          // Save email for auto-login later
          this.email = email;
          this.initializeResetPasswordForm();
          this.state = 'input';
        },
        err => {
          console.error(err);
          this.state = 'error';
        });
  }

  private initializeResetPasswordForm() {
    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);

    this.confirmPasswordControl = new FormControl('', Validators.required);

    this.resetPasswordForm = new FormGroup({
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl
    }, {}, matchingPasswordValidator('password', 'confirmPassword'));
  }

  private resetPassword(newPassword: string): void {
    this.authService.confirmPasswordReset(this.oobCode, newPassword).then(
        () => {
          this.state = 'success';
          this.authService.logInWithEmailPassword(this.email, newPassword).then(
              () =>this.router.navigateByUrl('/'));
        }, err => {
          console.error(err);
          this.state = 'error';
        });
  }

  /**
   * Resets the query parameters and redirects to the homepage
   */
  private redirectHome(): void {
    this.router.navigate(['/'], { queryParams: {} });
  }
}

type Action = 'resetPassword' | 'recoverEmail' | 'verifyEmail';

type State = 'loading' | 'input' | 'success' | 'error';
