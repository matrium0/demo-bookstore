import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageService} from '@app/features/authors/image.service';
import {SafeUrl} from '@angular/platform-browser';
import {GlobalMessageService} from '@core/global-message.service';
import {Book} from '@mock-backend/book/Book';
import {UserBookAssignmentStatus} from '@mock-backend/user/user-book-assignment-status';
import {EnrichedBook} from '@mock-backend/util/book-utils';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent implements OnInit {

  @Input()
  book?: EnrichedBook;
  imageUrl?: SafeUrl;

  @Output()
  openDetail = new EventEmitter<EnrichedBook>();
  @Output()
  statusChanged = new EventEmitter<{ book: Book, status: UserBookAssignmentStatus }>();

  constructor(private imageService: ImageService, private globalMessageService: GlobalMessageService) {
  }

  ngOnInit(): void {
    if (!this.book) {
      throw new Error("BookCardComponent requires book as Input to work");
    }
    this.imageUrl = this.imageService.createImageUrlFromBlob(this.book?.image);
  }

  openDetails() {
    this.openDetail.next(this.book!);
  }

  statusChange(status: UserBookAssignmentStatus) {
    const originalStatus = this.book?.assignmentStatus;
    this.book!.assignmentStatus = status;
    this.statusChanged.next({book: this.book!, status});

    if (originalStatus === "default") {
      this.globalMessageService.setAlertMessage("info", "Book is added to \"Your Books\"")
    }
  }
}
