import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCheck, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    FontAwesomeModule
  ]
})
export class CoreModule {

  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(faTimes);
    faIconLibrary.addIcons(faPlus);
    faIconLibrary.addIcons(faCheck);
  }
}
