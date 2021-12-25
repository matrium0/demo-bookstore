import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'}, {
    path: 'my-books',
    loadChildren: () => import('./your-books/your-books.module').then((m) => m.YourBooksModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./library/library.module').then((m) => m.LibraryModule),
  },
  {
    path: 'authors',
    loadChildren: () => import('./authors/authors.module').then((m) => m.AuthorsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
