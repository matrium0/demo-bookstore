import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '@mock-backend/book/Book';
import {ImageService} from '@app/features/authors/image.service';
import {SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  @Input()
  book?: Book;
  imageUrl?: SafeUrl;

  @Output()
  openBookEditPage =new EventEmitter<void>();

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
    if (!this.book) {
      throw new Error("BookDetailComponent requires Input() parameter \"book\" to be set");
    }
    this.imageUrl = this.imageService.createImageUrlFromBlob(this.book.image);
  }


  navigateToBookEditPage() {
    this.openBookEditPage.next();
  }
}
