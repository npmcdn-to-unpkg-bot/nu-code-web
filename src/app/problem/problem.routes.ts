import { RouterConfig } from '@angular/router';
import { ProblemComponent } from './';
import { ViewComponent } from './view';
import { MySubmissionsComponent } from './my-submissions';
import { LeaderboardComponent } from './leaderboard';

export const ProblemRoutes: RouterConfig = [
  {
    path: 'problems/:id',
    component: ProblemComponent,
    children: [
      { path: '', component: ViewComponent },
      { path: 'my-submissions', component: MySubmissionsComponent },
      { path: 'leaderboard', component: LeaderboardComponent }
    ]
  }
];
