import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthorsRoutingModule} from './authors-routing.module';
import {AuthorListComponent} from './author-list/author-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {AuthorTableComponent} from './author-table/author-table.component';
import {SharedModule} from '@shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {AuthorEditComponent} from './author-edit/author-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {QuillModule} from 'ngx-quill';
import {ImageCropperDialogComponent} from './image-cropper-dialog/image-cropper-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthorDetailComponent } from './author-detail/author-detail.component';

@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorTableComponent,
    AuthorEditComponent,
    ImageCropperDialogComponent,
    AuthorDetailComponent
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    MatTableModule,
    MatSortModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    QuillModule,
    MatDialogModule
  ]
})
export class AuthorsModule {
}
