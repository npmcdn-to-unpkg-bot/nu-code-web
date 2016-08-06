import { RouterConfig } from '@angular/router';
import { CreateProblemComponent } from './';
import { IsNeumonterGuard } from '../shared';

export const CreateProblemRoutes: RouterConfig = [
  {
    path: 'create-problem',
    component: CreateProblemComponent,
    canActivate: [IsNeumonterGuard]
  }
];
