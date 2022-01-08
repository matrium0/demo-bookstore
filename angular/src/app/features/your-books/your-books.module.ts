import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {YourBooksRoutingModule} from './your-books-routing.module';
import {YourBooksListComponent} from './your-books-list/your-books-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SharedModule} from '@shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    YourBooksListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    YourBooksRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule
  ]
})
export class YourBooksModule {
}
