import { RouterConfig } from '@angular/router';
import { LoginRequiredComponent } from './';
import { NotLoggedInGuard } from '../shared';

export const LoginRoutes: RouterConfig = [
  {
    path: 'login-required',
    component: LoginRequiredComponent,
    canActivate: [NotLoggedInGuard]
  }
];
