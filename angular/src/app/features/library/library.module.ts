import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LibraryRoutingModule} from './library-routing.module';
import {LibraryComponent} from './library/library.component';
import {BookEditComponent} from '@app/features/library/book-edit/book-edit.component';
import {SharedModule} from '@shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {QuillModule} from 'ngx-quill';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    LibraryComponent,
    BookEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LibraryRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    QuillModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule
  ]
})
export class LibraryModule {
}
