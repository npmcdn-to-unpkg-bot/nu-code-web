import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services';

/**
 * Only allows those with a verified email to pass.
 * If the user is unverified, they are redirected to the verification required page.
 */
@Injectable()
export class VerifiedGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.auth.map(auth => {
      let verified = this.authService.verified;
      if (!verified) {
        this.router.navigateByUrl('/');
      }
      return verified;
    });
  }
}
