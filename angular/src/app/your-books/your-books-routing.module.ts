import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {YourBooksListComponent} from './your-books-list/your-books-list.component';

const routes: Routes = [
  {path: "", component: YourBooksListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YourBooksRoutingModule {
}
