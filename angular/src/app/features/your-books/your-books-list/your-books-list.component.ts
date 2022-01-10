import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {Book} from '@mock-backend/book/Book';
import {findAllBooks} from '@mock-backend/book/book-mock-data';
import {MatDialog} from '@angular/material/dialog';
import {BookDetailDialogWrapperComponent} from '@shared/book-detail-dialog-wrapper/book-detail-dialog-wrapper.component';
import {Router} from '@angular/router';
import {enrichBookWithUserAssignments, EnrichedBook} from '@core/book-utils';
import {UserService} from '@core/user.service';
import {UserBookAssignmentStatus} from '@mock-backend/user/user-book-assignment-status';
import {updateStatus} from '@mock-backend/user/user-book-assignment-mockservice';

@Component({
  selector: 'app-your-books-list',
  templateUrl: './your-books-list.component.html',
  styleUrls: ['./your-books-list.component.scss']
})
export class YourBooksListComponent implements OnInit {
  filterByName$ = new BehaviorSubject("");
  filteredBooks$?: Observable<EnrichedBook[]>

  constructor(private matDialog: MatDialog, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    console.log("YourBooksListComponent ngOnInit");

    this.filteredBooks$ = combineLatest([this.filterByName$, findAllBooks()]).pipe(
        map((combination) => {
          const filterTerm = combination[0].toLowerCase();
          const books = combination[1].map(b => enrichBookWithUserAssignments(b, this.userService.authentication$.getValue()));

          console.log(books);
          console.log("filtering by \"" + filterTerm + "\"", books.length);
          return books.filter(b => b.title.toLocaleLowerCase().includes(filterTerm));
        }),
    );
  }

  filter(term: string) {
    this.filterByName$.next(term);
  }

  navigateToNewBook() {
    this.router.navigate(["/library/edit/new"]);
  }

  openBookDetail(book: Book) {
    this.matDialog.open(BookDetailDialogWrapperComponent, {
      data: {book},
      maxHeight: "70vh",
      maxWidth: "900px"
    }).afterClosed().subscribe((result) => {
      if (result?.openEditPage) {
        this.router.navigate(["/library/edit", book.id]);
      }
    });
  }

  handleStatusChanged(event: { book: Book, status: UserBookAssignmentStatus }) {
    console.log("LibraryComponent: statusChanged received", event);
    updateStatus(this.userService.authentication$.getValue(), event.book.id, event.status);
  }
}
