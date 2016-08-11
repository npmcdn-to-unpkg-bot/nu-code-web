import { RouterConfig } from '@angular/router';
import { CompetitionComponent } from './';
import { CountdownComponent } from './countdown';
import { ProblemViewComponent } from './problem-view';
import {
  LoggedInGuard,
  VerifiedGuard,
  CompetitionStartedGuard,
  CompetitionNotStartedGuard
} from '../shared';

export const CompetitionRoutes: RouterConfig = [
  {
    path: 'competitions/:id/countdown',
    component: CountdownComponent,
    canActivate: [
      LoggedInGuard,
      VerifiedGuard,
      CompetitionNotStartedGuard
    ]
  },
  {
    path: 'competitions/:id',
    component: CompetitionComponent,
    canActivate: [
      LoggedInGuard,
      VerifiedGuard,
      CompetitionStartedGuard
    ],
    children: [
      // What a routing structure >:{)
      {
        path: ''
      },
      {
        // Problem id
        path: ':problemId',
        component: ProblemViewComponent
      }
    ]
  }
];
