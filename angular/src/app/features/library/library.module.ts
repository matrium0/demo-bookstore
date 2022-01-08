import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LibraryRoutingModule} from './library-routing.module';
import {LibraryComponent} from './library/library.component';
import {BookEditComponent} from '@app/features/library/book-edit/book-edit.component';


@NgModule({
  declarations: [
    LibraryComponent,
    BookEditComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule {
}
