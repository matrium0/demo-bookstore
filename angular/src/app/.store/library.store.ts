import {createAction, createFeatureSelector, createReducer, createSelector, on, props} from '@ngrx/store';
import Author from '../../../../mock-backend/author/Author';

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

export const authorsListPageLoading = createAction(
    '[Author List] Loading'
);

export const authorsLoaded = createAction(
    '[Author API] Authors Loaded',
    props<{ authors: Author[] }>()
);


export const projectFeatureKey = "library";


export const reducer = createReducer(
    initialState.library,
    on(authorsListPageLoading, (state: LibraryState) => ({...state, loading: true})),
    on(authorsLoaded, (state: LibraryState, action) => ({...state, authors: action.authors, loading: true}))
);

export const librarySelector = createFeatureSelector<LibraryState>('library');


export const loadingSelector = createSelector(
    librarySelector,
    (state: LibraryState) => state.loading
);
