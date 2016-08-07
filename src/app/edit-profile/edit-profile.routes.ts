import { RouterConfig } from '@angular/router';
import { EditProfileComponent } from './';

export const EditProfileRoutes: RouterConfig = [
  {
    path: 'edit-profile/:id',
    component: EditProfileComponent
  }
];
