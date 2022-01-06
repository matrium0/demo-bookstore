import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import Author from '../../../../../mock-backend/author/Author';
import {authorsListPageLoading} from '../../.store/library.actions';
import {LibraryState} from '../../.store/library.reducers';
import {authorsSelector, librarySelector, loadingSelector} from '../../.store/library.selectors';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  loading$?: Observable<boolean>;
  authors$?: Observable<Author[]>;

  constructor(private store: Store<LibraryState>) {
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(loadingSelector);
    this.authors$ = this.store.select(authorsSelector);

    this.store.select(librarySelector).subscribe(
        libraryState => {
          console.log("librarystate change to ", libraryState);
        }
    )
    this.store.dispatch(authorsListPageLoading());
  }

}
