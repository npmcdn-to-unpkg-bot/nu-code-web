import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home';
import { ProblemComponent } from './problem';
import { ProblemListComponent } from './problem-list';
import { CompetitionListComponent } from './competition-list';

// TODO: this can be split up. See: http://plnkr.co/edit/QVWco9Yfzp4vpf59Y4sQ?p=preview
const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'problems', component: ProblemListComponent },
  { path: 'problems/:id', component: ProblemComponent },
  { path: 'competitions', component: CompetitionListComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
