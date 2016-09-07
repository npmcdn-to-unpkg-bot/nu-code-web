import { NgModule }       from '@angular/core';

import { HomeComponent } from './home.component';
import { homeRouting } from './home.routing';

@NgModule({
  imports: [homeRouting],
  declarations: [HomeComponent]
})
export class HomeModule { }
