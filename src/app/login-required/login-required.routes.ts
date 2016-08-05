import { RouterConfig } from '@angular/router';
import { LoginRequiredComponent } from './';

export const LoginRoutes: RouterConfig = [
  {
    path: 'login-required',
    component: LoginRequiredComponent
  }
];
