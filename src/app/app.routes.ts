import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home';
import { ProblemComponent } from './problem';
import { ProblemListComponent } from './problem-list';
import { CompetitionListComponent } from './competition-list';
import { RegisterComponent } from './register';

// TODO: this can be split up. See: http://plnkr.co/edit/QVWco9Yfzp4vpf59Y4sQ?p=preview
const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'problems', component: ProblemListComponent },
  { path: 'problems/:id', component: ProblemComponent },
  { path: 'competitions', component: CompetitionListComponent },
  { path: 'register', component: RegisterComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
