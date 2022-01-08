import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Book} from '@mock-backend/book/Book';

@Component({
  selector: 'app-book-detail-dialog-wrapper',
  templateUrl: './book-detail-dialog-wrapper.component.html',
  styleUrls: ['./book-detail-dialog-wrapper.component.scss']
})
export class BookDetailDialogWrapperComponent implements OnInit {
  book?: Book;

  constructor(private matDialogRef: MatDialogRef<BookDetailDialogWrapperComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { book: Book }) {
  }

  ngOnInit(): void {
    this.book = this.data.book;

    if (!this.book) {
      throw new Error("BookDetailDialogWrapperComponent requires MAT_DIALOG_Data with \"book\ field");
    }
  }

  openBookEditPage() {
    this.matDialogRef.close({openEditPage: true})
  }
}
