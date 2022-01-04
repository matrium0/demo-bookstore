import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCheck, faPlus, faSpinner, faTimes} from '@fortawesome/free-solid-svg-icons';
import {QuillModule} from 'ngx-quill';


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
  ]
})
export class CoreModule {

  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(faTimes);
    faIconLibrary.addIcons(faPlus);
    faIconLibrary.addIcons(faCheck);
    faIconLibrary.addIcons(faSpinner);
  }
}
