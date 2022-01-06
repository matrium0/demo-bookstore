import {createAction, props} from '@ngrx/store';
import Author from '../../../../mock-backend/author/Author';

export const authorsListPageLoading = createAction(
    '[Author List] Loading'
);

export const authorsLoaded = createAction(
    '[Author API] Authors Loaded',
    props<{ authors: Author[] }>()
);
