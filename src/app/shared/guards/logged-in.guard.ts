import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Only allows those who are logged in to pass.
 * If the user is not logged in, they are redirected to the login required page.
 */
@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService) { }

  canActivate(): boolean {
    let canActivate = this.authService.loggedIn;
    if (!canActivate) {
      this.router.navigateByUrl('/login-required');
    }
    return canActivate;
  }
}
