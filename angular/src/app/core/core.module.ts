import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCheck, faInfo, faPlus, faSpinner, faTimes} from '@fortawesome/free-solid-svg-icons';
import {QuillModule} from 'ngx-quill';
import {MAT_LUXON_DATE_ADAPTER_OPTIONS, MatLuxonDateModule} from '@angular/material-luxon-adapter';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import localeDeAt from '@angular/common/locales/de-AT';
import localeDeAtExtra from '@angular/common/locales/extra/de-AT';

registerLocaleData(localeDeAt, 'de-AT', localeDeAtExtra);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    FontAwesomeModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{'header': [1, 2, 3, 4, false]}],
        ],
      },
    }),
    MatLuxonDateModule,
    FontAwesomeModule
  ], providers: [
    {provide: LOCALE_ID, useValue: 'de-AT'},
    {
      provide: MAT_LUXON_DATE_ADAPTER_OPTIONS,
      useValue: {firstDayOfWeek: 1},
    },
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
})
export class CoreModule {

  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(faTimes);
    faIconLibrary.addIcons(faPlus);
    faIconLibrary.addIcons(faCheck);
    faIconLibrary.addIcons(faSpinner);
    faIconLibrary.addIcons(faInfo);
  }
}
