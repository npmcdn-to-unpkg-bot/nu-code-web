import { RouterConfig } from '@angular/router';
import { EditProblemComponent } from './';
import { CanEditProblemGuard } from '../shared';

export const EditProblemRoutes: RouterConfig = [
  {
    path: 'edit-problem/:id',
    component: EditProblemComponent,
    canActivate: [CanEditProblemGuard]
  }
];
