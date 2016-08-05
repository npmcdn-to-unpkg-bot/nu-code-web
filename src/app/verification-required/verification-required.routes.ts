import { RouterConfig } from '@angular/router';
import { VerificationRequiredComponent } from './';
import { NotVerifiedGuard } from '../shared';

export const VerificationRoutes: RouterConfig = [
  {
    path: 'verification-required',
    component: VerificationRequiredComponent,
    canActivate: [NotVerifiedGuard]
  }
];
