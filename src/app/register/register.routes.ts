import { RouterConfig } from '@angular/router';
import { RegisterComponent } from './';
import { NotLoggedInGuard } from '../shared';

export const RegisterRoutes: RouterConfig = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotLoggedInGuard]
  }
];
