import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  { path: '', component: HomeComponent }
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);
