import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { AppComponent, AppRouterProviders, environment } from './app/';
import { AuthService, RepositoryService } from './app/shared';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  // Angular 2 RC.4 use new forms
  disableDeprecatedForms(),
  provideForms(),
  // Firebase
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: 'AIzaSyBJeW4SZUNUySEHd7GLc1qwBxsNLgN2a8Y',
    authDomain: 'nu-code-350ea.firebaseapp.com',
    databaseURL: 'https://nu-code-350ea.firebaseio.com',
    storageBucket: 'nu-code-350ea.appspot.com',
  }),
  AuthService,
  RepositoryService,
  AppRouterProviders
]).catch(err => console.error(err));
