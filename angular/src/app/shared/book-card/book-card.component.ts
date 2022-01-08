import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '@mock-backend/book/Book';
import {ImageService} from '@app/features/authors/image.service';
import {SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent implements OnInit {

  @Input()
  book?: Book;
  imageUrl?: SafeUrl;

  @Output()
  openDetail = new EventEmitter<Book>();

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
}