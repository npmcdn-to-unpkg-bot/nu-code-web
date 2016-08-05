import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services';

/**
 * Only allows those WITHOUT a verified email to pass.
 * Those with a verified email are taken to the homepage.
 */
@Injectable()
export class NotVerifiedGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService) { }

  canActivate() {
    let canActivate = !this.authService.verified;
    if (!canActivate) {
      this.router.navigateByUrl('/');
    }
    return canActivate;
  }
}
