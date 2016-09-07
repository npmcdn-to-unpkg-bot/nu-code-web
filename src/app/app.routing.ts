import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const homeRoutes: Routes = [
  { path: '', loadChildren: 'app/home/home.module#HomeModule' }
];

const appRoutes: Routes = [
  ...homeRoutes
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
