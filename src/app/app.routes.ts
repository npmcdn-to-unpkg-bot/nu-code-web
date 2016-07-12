import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home';
import { ProblemListComponent } from './problem-list';
import { CompetitionListComponent } from './competition-list';

const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'problems', component: ProblemListComponent },
  { path: 'competitions', component: CompetitionListComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
