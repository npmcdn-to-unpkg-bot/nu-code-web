import { provideRouter, RouterConfig } from '@angular/router';
import { HomeRoutes } from './home';
import { ProblemRoutes } from './problem';
import { ProblemListRoutes } from './problem-list';
import { ProfileRoutes } from './profile';
import { CompetitionListRoutes } from './competition-list';
import { RegisterRoutes } from './register';
import { LoginRoutes } from './login-required';
import { VerificationRoutes } from './verification-required';
import { UserManagementRoutes } from './user-management';
import { LoggedInGuard, NotLoggedInGuard, VerifiedGuard, NotVerifiedGuard } from './shared';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...ProblemListRoutes,
  ...ProblemRoutes,
  ...ProfileRoutes,
  ...CompetitionListRoutes,
  ...RegisterRoutes,
  ...LoginRoutes,
  ...VerificationRoutes,
  ...UserManagementRoutes
];

export const AppRouterProviders = [
  LoggedInGuard,
  NotLoggedInGuard,
  VerifiedGuard,
  NotVerifiedGuard,
  provideRouter(routes),
];
