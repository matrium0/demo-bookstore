import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageService} from '@app/features/authors/image.service';
import {SafeUrl} from '@angular/platform-browser';
import {EnrichedBook} from '@core/book-utils';
import {UserBookAssignmentStatus} from '@mock-backend/user/user-book-assignment-status';
import {Book} from '@mock-backend/book/Book';

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

  constructor(private imageService: ImageService) {
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
    console.log("bookcrad statuschanged");
    this.book!.assignmentStatus = status;
    this.statusChanged.next({book: this.book!, status});
  }
}
