import { RouterConfig } from '@angular/router';
import { LoginRequiredComponent } from './';

export const LoginRoutes: RouterConfig = [
  {
    path: 'login',
    component: LoginRequiredComponent
    // TODO: can only activate if NOT logged in
  }
];
