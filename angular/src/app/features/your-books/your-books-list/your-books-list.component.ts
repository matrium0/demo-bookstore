import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {Book} from '@mock-backend/book/Book';
import {findBooksForUser} from '@mock-backend/book/book-mock-data';
import {MatDialog} from '@angular/material/dialog';
import {BookDetailDialogWrapperComponent} from '@shared/book-detail-dialog-wrapper/book-detail-dialog-wrapper.component';
import {Router} from '@angular/router';
import {UserService} from '@core/user.service';
import {UserBookAssignmentStatus} from '@mock-backend/user/user-book-assignment-status';
import {updateStatus} from '@mock-backend/user/user-book-assignment-mockservice';
import {enrichBookWithUserAssignments, EnrichedBook} from '@mock-backend/util/book-utils';

@Component({
  selector: 'app-your-books-list',
  templateUrl: './your-books-list.component.html',
  styleUrls: ['./your-books-list.component.scss']
})
export class YourBooksListComponent implements OnInit, AfterViewInit {
  @ViewChild('filterInput') filterElement?: ElementRef;

  filterByName$ = new BehaviorSubject("");
  filteredBooks$?: Observable<EnrichedBook[]>

  constructor(private matDialog: MatDialog, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.filteredBooks$ = combineLatest([this.filterByName$, findBooksForUser(this.userService.authentication$.getValue())]).pipe(
      map((combination: any) => {
        const filterTerm = combination[0].toLowerCase();
        const books = combination[1].map((b: Book) => enrichBookWithUserAssignments(b, this.userService.authentication$.getValue()));

        console.log(books);
        return books.filter((b: EnrichedBook) => b.title?.toLocaleLowerCase().includes(filterTerm) && b.assignmentStatus !== 'default');
      }),
    );
  }

  ngAfterViewInit(): void {
    this.filterElement?.nativeElement.focus;
  }

  filter(term: string) {
    this.filterByName$.next(term);
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
    updateStatus(this.userService.authentication$.getValue(), event.book.id!, event.status);
  }
}
