import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorListComponent } from './author-list/author-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { AuthorTableComponent } from './author-table/author-table.component';


@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorTableComponent
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    MatTableModule,
    MatSortModule
  ]
})
export class AuthorsModule { }
