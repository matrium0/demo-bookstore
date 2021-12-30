import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorListComponent } from './author-list/author-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { AuthorTableComponent } from './author-table/author-table.component';
import {SharedModule} from '../shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorTableComponent
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    MatTableModule,
    MatSortModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ]
})
export class AuthorsModule { }
