import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YourBooksRoutingModule } from './your-books-routing.module';
import { YourBooksListComponent } from './your-books-list/your-books-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [
    YourBooksListComponent
  ],
  imports: [
    CommonModule,
    YourBooksRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    SharedModule
  ]
})
export class YourBooksModule { }
