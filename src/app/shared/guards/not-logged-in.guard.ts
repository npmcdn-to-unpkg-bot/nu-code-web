import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Only allows those who are NOT logged in to pass.
 * If the user is logged in, they are redirected to the homepage.
 */
@Injectable()
export class NotLoggedInGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService) { }

  canActivate(): boolean {
    let canActivate = !this.authService.loggedIn;
    if (!canActivate) {
      this.router.navigateByUrl('/');
    }
    return canActivate;
  }
}
