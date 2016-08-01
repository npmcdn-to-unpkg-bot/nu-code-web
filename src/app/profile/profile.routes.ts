import { RouterConfig } from '@angular/router';
import { ProfileComponent } from './';

export const ProfileRoutes: RouterConfig = [
  { path: 'profile/:id', component: ProfileComponent }
];
