import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: "/home", pathMatch: "full"
  },
  {
    path: 'home', loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'your-books', loadChildren: () => import('./features/your-books/your-books.module').then((m) => m.YourBooksModule),
  },
  {
    path: 'library', loadChildren: () => import('./features/library/library.module').then((m) => m.LibraryModule),
  },
  {
    path: 'author', loadChildren: () => import('./features/authors/authors.module').then((m) => m.AuthorsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
