import { provideRouter, RouterConfig } from '@angular/router';
import { HomeRoutes } from './home';
import { ProblemRoutes } from './problem';
import { ProblemListRoutes } from './problem-list';
import { ProfileRoutes } from './profile';
import { CompetitionListRoutes } from './competition-list';
import { RegisterRoutes } from './register';
import { LoginRoutes } from './login-required';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...ProblemListRoutes,
  ...ProblemRoutes,
  ...ProfileRoutes,
  ...CompetitionListRoutes,
  ...RegisterRoutes,
  ...LoginRoutes
];

export const AppRouterProviders = [
  provideRouter(routes)
];
