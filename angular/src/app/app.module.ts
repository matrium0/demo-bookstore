import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {registerLocaleData} from '@angular/common';
import localeDeAt from '@angular/common/locales/de-AT';
import localeDeAtExtra from '@angular/common/locales/extra/de-AT';
import {MatLuxonDateModule} from '@angular/material-luxon-adapter';
import {MAT_DATE_FORMATS} from '@angular/material/core';

registerLocaleData(localeDeAt, 'de-AT', localeDeAtExtra);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    MatLuxonDateModule //TODO move to core module?
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de-AT'},
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'd.L.yyyy',
        },
        display: {
          dateInput: 'dd.LL.yyyy',
          monthYearLabel: 'LLLL yyyy',
          dateA11yLabel: 'cccc.LLLL.yyyy',
          monthYearA11yLabel: 'LLLL yyyy',
        },
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
