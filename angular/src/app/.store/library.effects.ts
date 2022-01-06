import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, map, mergeMap} from 'rxjs';
import {authorsListPageLoading, authorsLoaded} from './library.store';
import {findAllAuthors} from '../../../../mock-backend/author/AuthorMockService';

// @ts-ignore
@Injectable()
export class LibraryEffects {
  loadMovies$ = createEffect(() => this.actions$.pipe(
          ofType(authorsListPageLoading),
          mergeMap(() => findAllAuthors()
              .pipe(
                  map(authors => (authorsLoaded({authors}))),
                  catchError(() => EMPTY) //TODO error handling, e.g. displaying a message
              ))
      )
  );

  constructor(
      private actions$: Actions
  ) {
  }
}
