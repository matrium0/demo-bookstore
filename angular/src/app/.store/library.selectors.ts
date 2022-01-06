import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LibraryState} from './library.reducers';

export const librarySelector = createFeatureSelector<LibraryState>('library');

export const loadingSelector = createSelector(
    librarySelector,
    (state: LibraryState) => state.loading
);

export const authorsSelector = createSelector(
    librarySelector,
    (state: LibraryState) => state.authors
);
