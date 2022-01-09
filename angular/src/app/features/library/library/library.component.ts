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

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  filterByName$ = new BehaviorSubject("");
  books$?: Observable<EnrichedBook[]>
  filteredBooks$?: Observable<EnrichedBook[]>

  constructor(private globalMessageService: GlobalMessageService, private matDialog: MatDialog,
              private router: Router, private userService: UserService) {
  }


  ngOnInit(): void {
    console.log("LibraryComponent ngOnInit");

    this.filteredBooks$ = combineLatest([this.filterByName$, findAllBooks()]).pipe(
        map((combination) => {
          const filterTerm = combination[0].toLowerCase();
          const allBooks = combination[1].map(b => enrichBookWithUserAssignments(b, this.userService.authentication$.getValue()));
          console.log("filtering by \"" + filterTerm + "\"", allBooks.length);
          return allBooks.filter(b => b.title.toLocaleLowerCase().includes(filterTerm));
        }),
    );
  }

  filter(searchTerm: string) {
    this.filterByName$.next(searchTerm);
  }

  navigateToNewBook() {

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
}
