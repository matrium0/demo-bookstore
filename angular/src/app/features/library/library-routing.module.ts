import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LibraryComponent} from './library/library.component';
import {BookEditComponent} from '@app/features/library/book-edit/book-edit.component';

const routes: Routes = [
  {path: "", component: LibraryComponent},
  {path: "edit/:id", component: BookEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule {
}
