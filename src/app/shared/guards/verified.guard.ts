import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services';

/**
 * Only allows those with a verified email to pass.
 */
@Injectable()
export class VerifiedGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService) { }

  canActivate() {
    let canActivate = this.authService.loggedIn && this.authService.user.verified;
    if (!canActivate) {
      this.router.navigateByUrl('/verification-required');
    }
    return canActivate;
  }
}
