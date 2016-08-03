import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Only allows those who are logged in to pass.
 * If the user is not logged in, they are redirected to '/login', the login required page.
 */
@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService) { }

  canActivate() {
    let canActivate = !!this.authService.user;
    if (!canActivate) {
      this.router.navigateByUrl('/login');
    }
    return canActivate;
  }
}
