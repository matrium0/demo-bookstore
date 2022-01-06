import {createReducer, on} from '@ngrx/store';
import Author from '../../../../mock-backend/author/Author';
import {authorsListPageLoading, authorsLoaded} from './library.actions';

export interface AppState {
  library: LibraryState
}

export interface LibraryState {
  loading: boolean,
  authors: Author[]
}

const initialState: AppState = {
  library: {
    loading: false,
    authors: []
  }
}

export const projectFeatureKey = "library";

export const reducer = createReducer(
    initialState.library,
    on(authorsListPageLoading, (state: LibraryState) => ({...state, loading: true})),
    on(authorsLoaded, (state: LibraryState, action) => ({...state, authors: action.authors, loading: true}))
);


