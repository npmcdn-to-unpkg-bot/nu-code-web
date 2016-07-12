import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, appRouterProviders, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  appRouterProviders
])
.catch(err => console.error(err));
