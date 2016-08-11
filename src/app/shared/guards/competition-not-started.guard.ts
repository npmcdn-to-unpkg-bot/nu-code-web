import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { RepositoryService } from '../services';

/**
 * Only allows passage if the start time of the competition is before now.
 * If this criteria is not met, the user is redirected to the select-problem page
 */
@Injectable()
export class CompetitionNotStartedGuard implements CanActivate {
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    let currentTime = new Date();
    let competitionId = route.params['id'];
    return this.repoService.getCompetition(competitionId)
        .map(competition => competition.startTime)
        .map(startTime => {
          let hasStarted = currentTime > startTime;
          if (hasStarted) {
            this.router.navigate(['competitions', competitionId]);
          }
          return !hasStarted;
        })
        .take(1); // Observable needs to complete
  }
}
