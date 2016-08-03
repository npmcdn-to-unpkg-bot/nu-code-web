import { RouterConfig } from '@angular/router';
import { CompetitionListComponent } from './';
import { LoggedInGuard } from '../shared';

export const CompetitionListRoutes: RouterConfig = [
  {
    path: 'competitions',
    component: CompetitionListComponent,
    canActivate: [LoggedInGuard]
  }
];
