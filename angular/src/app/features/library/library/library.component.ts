import {Component, OnInit} from '@angular/core';
import {findAllBooks} from '@mock-backend/book/book-mock-data';
import {Book} from '@mock-backend/book/Book';
import {GlobalMessageService} from '@core/global-message.service';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {BookDetailDialogWrapperComponent} from '@shared/book-detail-dialog-wrapper/book-detail-dialog-wrapper.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {enrichBookWithUserAssignments, EnrichedBook} from '@core/book-utils';
import {UserService} from '@core/user.service';
import {UserBookAssignmentStatus} from '@mock-backend/user/user-book-assignment-status';
import {findUserBookAssignmentsForUser, updateStatus} from '@mock-backend/user/user-book-assignment-mockservice';

type ShowAllSelectTypes = "HIDE_YOUR_BOOKS" | "SHOW_ALL";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  filterByName$ = new BehaviorSubject("");
  showAllSelectFilter$ = new BehaviorSubject<ShowAllSelectTypes>("HIDE_YOUR_BOOKS");
  filteredBooks$?: Observable<EnrichedBook[]>

  constructor(private globalMessageService: GlobalMessageService, private matDialog: MatDialog,
              private router: Router, private userService: UserService) {
  }


  ngOnInit(): void {
    console.log("LibraryComponent ngOnInit");

    this.filteredBooks$ = combineLatest([this.filterByName$, this.showAllSelectFilter$, findAllBooks()]).pipe(
        map((combination: any) => {
          const filterTerm = combination[0].toLowerCase();
          const showAllSelectFilter = combination[1];
          let allBooks = combination[2].map((b: Book) => enrichBookWithUserAssignments(b, this.userService.authentication$.getValue()));
          console.log("filtering by \"" + filterTerm + "\"", showAllSelectFilter, allBooks.length);
          if (showAllSelectFilter === 'HIDE_YOUR_BOOKS') {
            allBooks = allBooks.filter((book: EnrichedBook) => !(findUserBookAssignmentsForUser(this.userService.authentication$.getValue()).map(b => b.bookId).includes(book.id)))
          }

          return allBooks.filter((b: EnrichedBook) => b.title.toLocaleLowerCase().includes(filterTerm));
        }),
    );
  }

  filter(searchTerm: string) {
    this.filterByName$.next(searchTerm);
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

  handleSelectAllChange(value: string) {
    const selectAllChange = value as ShowAllSelectTypes;
    this.showAllSelectFilter$.next(selectAllChange);
  }
}
