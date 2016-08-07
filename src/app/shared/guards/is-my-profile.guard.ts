import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../services';

/**
 * Only allows passage if the user's id is equal to the profile id
 * If the user does not meet this criteria, they are redirected to the homepage.
 */
@Injectable()
export class IsMyProfileGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    let profileId = route.params['id'];
    return this.authService.auth.map(auth => {
      let isMyProfile = auth ? auth.uid === profileId : false;
      if (!isMyProfile) {
        this.router.navigateByUrl('/');
      }
      return isMyProfile;
    }).take(1); // Observable needs to complete
  }
}
