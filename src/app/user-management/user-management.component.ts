import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService, LoginModalService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-user-management',
  templateUrl: 'user-management.component.html',
  styleUrls: ['user-management.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class UserManagementComponent implements OnInit {
  action: Action;
  state: State;

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
        this.handleEvent(mode, oobCode);
      } else {
        this.redirectHome();
      }
    });
  }

  private handleEvent(mode: string, oobCode: string): void {
    this.authService.userObservable.subscribe(user => {
      if (user) {
        this.state = State.Loading;
        switch (mode) {
          case 'resetPassword':
            // TODO:
            break;
          case 'recoverEmail':
            // TODO:
            break;
          case 'verifyEmail':
            this.action = Action.VerifyEmail;
            this.verifyEmail(oobCode).then(
                () => this.state = State.Success,
                err => this.state = State.Error);
            break;
          default:
            this.redirectHome();
            // TODO: error
            break;
        }
      }
    });
  }

  private verifyEmail(oobCode: string): Promise<void> {
    return firebase.auth().applyActionCode(oobCode);
  }

  private redirectHome(): void {
    this.router.navigateByUrl('/');
  }
}

enum Action {
  ResetPassword,
  RecoverEmail,
  VerifyEmail
}

enum State {
  Loading,
  Success,
  Error
}
