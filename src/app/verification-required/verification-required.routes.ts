import { RouterConfig } from '@angular/router';
import { VerificationRequiredComponent } from './';

export const VerificationRoutes: RouterConfig = [
  {
    path: 'verification-required',
    component: VerificationRequiredComponent
    // TODO: can only activate if NOT verified
  }
];
