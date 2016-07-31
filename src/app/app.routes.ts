import { provideRouter, RouterConfig } from '@angular/router';
import { HomeRoutes } from './home';
import { ProblemRoutes } from './problem';
import { ProblemListRoutes } from './problem-list';
import { CompetitionListRoutes } from './competition-list';
import { RegisterRoutes } from './register';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...ProblemListRoutes,
  ...ProblemRoutes,
  ...CompetitionListRoutes,
  ...RegisterRoutes
];

export const AppRouterProviders = [
  provideRouter(routes)
];
