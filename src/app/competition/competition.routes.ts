import { RouterConfig } from '@angular/router';
import { CompetitionComponent } from './';
import { RoundComponent } from './round';
import { CountdownComponent } from './countdown';
import { LoggedInGuard, VerifiedGuard } from '../shared';

export const CompetitionRoutes: RouterConfig = [
  {
    path: 'competition/:id',
    component: CompetitionComponent,
    canActivate: [
      LoggedInGuard,
      VerifiedGuard
    ],
    children: [
      {
        path: '',
        component: RoundComponent
        // TODO: guard to redirect countdown if the competition has not started
      },
      {
        path: 'countdown',
        component: CountdownComponent
      }
    ]
  }
];
