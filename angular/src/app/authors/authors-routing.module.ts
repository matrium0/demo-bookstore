import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorListComponent} from './author-list/author-list.component';
import {AuthorEditComponent} from './author-edit/author-edit.component';
import {AuthorDetailComponent} from './author-detail/author-detail.component';

const routes: Routes = [
  {path: "", component: AuthorListComponent},
  {path: ":id", component: AuthorDetailComponent},
  {path: "edit/:id", component: AuthorEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorsRoutingModule {
}
