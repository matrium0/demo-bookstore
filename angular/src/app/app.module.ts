import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from '@core/core.module';
import {MatLuxonDateModule} from '@angular/material-luxon-adapter';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
//TODO move to core module?
  ],

  bootstrap: [AppComponent]
})
export class AppModule {

}
