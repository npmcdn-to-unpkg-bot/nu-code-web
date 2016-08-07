import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService, RepositoryService } from '../services';

/**
 * Only allows those who are Neumont faculty or the creator of the problem to pass.
 * If the user does not meet this criteria, they are redirected to the homepage.
 */
@Injectable()
export class CanEditProblemGuard implements CanActivate {
  isCreator: boolean;
  isFaculty: boolean;

  constructor(
      private router: Router,
      private authService: AuthService,
      private repoService: RepositoryService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return Observable.create(observer => {
      // Handle 'OR' between the two Observable<boolean>s below
      let result = (result: boolean) => {
        let done = this.isCreator !== undefined && this.isFaculty !== undefined;
        if (done) {
          let canEdit = this.isCreator || this.isFaculty;
          if (!canEdit) {
            this.router.navigateByUrl('/');
          }
          observer.next(canEdit);
          observer.complete();
        }
      }
      // Check if is faculty
      this.authService.isFaculty.take(1).subscribe(isFaculty => {
        this.isFaculty = isFaculty;
        result(isFaculty);
      });
      // Check if is creator
      let problemId = route.params['id'];
      this.authService.auth.take(1).subscribe(auth => {
        if (auth) {
          this.repoService.getProblem(problemId).take(1).subscribe(problem => {
            this.isCreator = problem.creatorUid === auth.uid;
            result(this.isCreator);
          });
        } else {
          this.isCreator = false;
          result(false);
        }
      });
    });
  }
}
