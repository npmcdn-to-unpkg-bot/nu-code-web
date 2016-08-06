import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
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

  canActivate(): Observable<boolean> {
    return this.authService.loggedIn.map(loggedIn => {
      if (loggedIn) {
        this.router.navigateByUrl('/');
      }
      return !loggedIn;
    }).take(1); // Observable needs to complete
  }
}
