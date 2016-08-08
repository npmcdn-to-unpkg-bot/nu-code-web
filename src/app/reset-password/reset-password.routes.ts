import { RouterConfig } from '@angular/router';
import { ResetPasswordComponent } from './';
import { NotLoggedInGuard } from '../shared';

export const ResetPasswordRoutes: RouterConfig = [
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [NotLoggedInGuard]
  }
];
