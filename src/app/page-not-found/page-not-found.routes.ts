import { RouterConfig } from '@angular/router';
import { PageNotFoundComponent } from './';

export const PageNotFoundRoutes: RouterConfig = [
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
