import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState, authorsListPageLoading, librarySelector, loadingSelector} from '../../reducers/library.store';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  loading$?: Observable<boolean>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    // this.loading$ = this.store.select("loading"); //TODO

    this.loading$ = this.store.select(loadingSelector); //TODO


    this.store.select(librarySelector).subscribe(
        libraryState => {
          console.log("librarystate change to ", libraryState);
        }
    )

    // console.log("this.loading", this.loading$);
    // // this.loading$.subscribe(
    // //     (loading) => {
    // //       console.log("subscribe fired , loading was changed to ", loading);
    // //     }
    // // )
    this.store.dispatch(authorsListPageLoading());
  }

}
