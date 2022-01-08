import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {Book} from '@mock-backend/book/Book';
import {findAllBooks} from '@mock-backend/book/book-mock-data';
import {MatDialog} from '@angular/material/dialog';
import {BookDetailDialogWrapperComponent} from '@shared/book-detail-dialog-wrapper/book-detail-dialog-wrapper.component';

@Component({
  selector: 'app-your-books-list',
  templateUrl: './your-books-list.component.html',
  styleUrls: ['./your-books-list.component.scss']
})
export class YourBooksListComponent implements OnInit {
  filterByName$ = new BehaviorSubject("");
  books$?: Observable<Book[]>
  filteredBooks$?: Observable<Book[]>

  constructor(private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.books$ = findAllBooks();
    this.filteredBooks$ = combineLatest([this.filterByName$, this.books$]).pipe(
        map((combination) => {
          const filterTerm = combination[0];
          const books = combination[1];
          return books.filter(b => b.title.includes(filterTerm));
        }),
    );
  }

  filter(term: string) {
    this.filterByName$.next(term);
  }

  navigateToNewBook() {

  }

  openBookDetail(book: Book) {
    this.matDialog.open(BookDetailDialogWrapperComponent, {
      data: {book},
    });
  }
}
