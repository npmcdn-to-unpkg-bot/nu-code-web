import { RouterConfig } from '@angular/router';
import { CompetitionComponent } from './';
import { CountdownComponent } from './countdown';
import { ScoreboardComponent } from './scoreboard';
import { ProblemViewComponent } from './problem-view';
import {
  LoggedInGuard,
  VerifiedGuard,
  CompetitionStartedGuard,
  CompetitionNotStartedGuard
} from '../shared';

export const CompetitionRoutes: RouterConfig = [
  {
    path: 'competitions/:id',
    children: [
      {
        path: 'countdown',
        component: CountdownComponent,
        canActivate: [CompetitionNotStartedGuard]
      },
      {
        path: 'scoreboard',
        component: ScoreboardComponent,
        canActivate: [CompetitionStartedGuard]
      },
      {
        path: '',
        component: CompetitionComponent,
        canActivate: [
          LoggedInGuard,
          VerifiedGuard,
          CompetitionStartedGuard
        ],
        children: [
          {
            path: ''
          },
          {
            path: ':problemId',
            component: ProblemViewComponent
          }
        ]
      }
    ]
  }
];
