import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

/**
 * Only allows those who are logged in, verified, and have a Neumont email to pass.
 * If the user does not meet this criteria, they are redirected to the homepage.
 */
@Injectable()
export class IsNeumonterGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.isNeumonter.map(isNeumonter => {
      if (!isNeumonter) {
        this.router.navigateByUrl('/');
      }
      return isNeumonter;
    }).take(1); // Observable needs to complete
  }
}
