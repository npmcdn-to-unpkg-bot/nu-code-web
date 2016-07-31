import { RouterConfig } from '@angular/router';
import { ProblemComponent } from './';

export const ProblemRoutes: RouterConfig = [
  {
    path: 'problems/:id',
    component: ProblemComponent
  }
];
