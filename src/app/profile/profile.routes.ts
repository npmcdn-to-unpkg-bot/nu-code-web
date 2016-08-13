import { RouterConfig } from '@angular/router';
import { ProfileComponent } from './';

export const ProfileRoutes: RouterConfig = [
  { path: 'profiles/:id', component: ProfileComponent }
];
