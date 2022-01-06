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
    initialState,
    on(authorsListPageLoading, (state: AppState) => ({...state, loading: true})),
    on(authorsLoaded, (state: AppState, action) => ({...state, authors: action.authors, loading: true}))
);

export const librarySelector = createFeatureSelector<LibraryState>('library');


export const loadingSelector = createSelector(
    librarySelector,
    (state: LibraryState) => state.loading
);

// export const loadingSelector = createFeatureSelector<AppState, FeatureState>(featureKey);
// export const loadingSelector = createSelector(
//     librarySelector,
//     (loading: boolean) => loading
// );

export const LibraryEffects: any = "todo change"; //TODO add effects

