import {Component, Input, OnInit} from '@angular/core';
import {Book} from '@mock-backend/book/Book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  @Input()
  book?: Book;

  constructor() { }

  ngOnInit(): void {
    if (!this.book) {
      throw new Error("BookDetailComponent requires Input() parameter \"book\" to be set");
    }
    console.log("ngoninit");
  }


}
