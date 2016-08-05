import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
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
        this.handleEvent(mode, oobCode);
      } else {
        this.redirectHome();
      }
    });
  }

  private handleEvent(mode: string, oobCode: string): void {
    // Await log in
    let subscription = this.authService.auth.subscribe(auth => {
      if (auth) {
        subscription.unsubscribe();
        this.state = 'loading';
        switch (mode) {
          case 'resetPassword':
            // TODO:
            break;
          case 'recoverEmail':
            // TODO:
            break;
          case 'verifyEmail':
            this.action = 'verifyEmail';
            this.authService.verifyEmail(oobCode).then(
                () => this.state = 'success',
                err => this.state = 'error');
            break;
          default:
            this.redirectHome();
            break;
        }
      }
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

type State = 'loading' | 'success' | 'error';
