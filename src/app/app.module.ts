import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { LoginModalModule } from './login-modal';
import { NavbarModule } from './navbar';

export const firebaseConfig = {
  apiKey: 'AIzaSyBJeW4SZUNUySEHd7GLc1qwBxsNLgN2a8Y',
  authDomain: 'nu-code-350ea.firebaseapp.com',
  databaseURL: 'https://nu-code-350ea.firebaseio.com',
  storageBucket: 'nu-code-350ea.appspot.com',
};

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,

    AngularFireModule.initializeApp(firebaseConfig),

    routing,

    NavbarModule,
    LoginModalModule
  ],
  declarations: [AppComponent],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
