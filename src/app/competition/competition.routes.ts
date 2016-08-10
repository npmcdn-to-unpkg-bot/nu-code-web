import { RouterConfig } from '@angular/router';
import { CompetitionComponent } from './';
import { LoggedInGuard, VerifiedGuard } from '../shared';

export const CompetitionRoutes: RouterConfig = [
  {
    path: 'competition/:id',
    component: CompetitionComponent,
    canActivate: [
      LoggedInGuard,
      VerifiedGuard
    ]
  }
];
