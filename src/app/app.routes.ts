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
import { CreateProblemRoutes } from './create-problem';
import { EditProblemRoutes } from './edit-problem';
import {
  LoggedInGuard,
  NotLoggedInGuard,
  VerifiedGuard,
  NotVerifiedGuard,
  IsNeumonterGuard
} from './shared';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...ProblemListRoutes,
  ...ProblemRoutes,
  ...ProfileRoutes,
  ...CompetitionListRoutes,
  ...RegisterRoutes,
  ...LoginRoutes,
  ...VerificationRoutes,
  ...UserManagementRoutes,
  ...CreateProblemRoutes,
  ...EditProblemRoutes
];

export const AppRouterProviders = [
  LoggedInGuard,
  NotLoggedInGuard,
  VerifiedGuard,
  NotVerifiedGuard,
  IsNeumonterGuard,
  provideRouter(routes),
];
