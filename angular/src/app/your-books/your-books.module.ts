import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YourBooksRoutingModule } from './your-books-routing.module';
import { YourBooksListComponent } from './your-books-list/your-books-list.component';


@NgModule({
  declarations: [
    YourBooksListComponent
  ],
  imports: [
    CommonModule,
    YourBooksRoutingModule
  ]
})
export class YourBooksModule { }
