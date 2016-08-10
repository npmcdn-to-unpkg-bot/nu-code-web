import { RouterConfig } from '@angular/router';
import { SelectProblemComponent } from './select-problem';
import { CountdownComponent } from './countdown';
import { CompetitionStartedGuard, LoggedInGuard, VerifiedGuard } from '../shared';

export const CompetitionRoutes: RouterConfig = [
  {
    path: 'competitions',
    canActivate: [
      LoggedInGuard,
      VerifiedGuard
    ],
    children: [
      // What a routing structure
      {
        path: ':id',
        component: SelectProblemComponent,
        canActivate: [CompetitionStartedGuard]
      },
      {
        path: ':id/countdown',
        component: CountdownComponent
      }
    ]
  }
];
