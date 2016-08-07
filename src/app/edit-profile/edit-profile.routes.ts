import { RouterConfig } from '@angular/router';
import { EditProfileComponent } from './';
import { IsMyProfileGuard } from '../shared';

export const EditProfileRoutes: RouterConfig = [
  {
    path: 'edit-profile/:id',
    component: EditProfileComponent,
    canActivate: [IsMyProfileGuard]
  }
];
