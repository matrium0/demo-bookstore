import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {deleteBook, findBookById} from '@mock-backend/book/book-mock-data';
import {ActivatedRoute} from '@angular/router';
import {GlobalMessageService} from '@core/global-message.service';
import {DateTime} from 'luxon';
import {Book} from '@mock-backend/book/Book';
import {ImageService} from '@app/features/authors/image.service';
import {SafeUrl} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent {
  isLoading = false;
  imageUrl?: SafeUrl;
  formGroup = new FormGroup({
        id: new FormControl(null, Validators.required),
        title: new FormControl(null, Validators.required),
        subtitle: new FormControl(null),
        firstPublished: new FormControl(null, Validators.required),
        series: new FormControl(null),
        numberWithinSeries: new FormControl(null),
        genre: new FormControl(null, Validators.required),

        authorFullName: new FormControl(null, Validators.required),
        authorId: new FormControl(null, Validators.required),

        description: new FormControl(null, Validators.required),
        image: new FormControl(null, Validators.required),
      }
  );

  constructor(private activatedRoute: ActivatedRoute, private globalMessageService: GlobalMessageService,
              private imageService: ImageService) {
    this.activatedRoute.params.subscribe(
        params => {
          const id = params['id'];
          if (id === "new") {
            this.isLoading = false;
          } else {
            this.loadBook(Number(id));
          }
        }
    )
  }

  get id() {
    return this.formGroup.get("id")?.value;
  }

  get title() {
    return this.formGroup.get("title")?.value;
  }

  private loadBook(id: number) {
    this.isLoading = true;
    findBookById(id).subscribe({
      next: (book: Book) => {
        console.log("loadAuthor SUCCESS", book);
        this.isLoading = false;
        this.formGroup.patchValue(book);
        //TODO come back and check for fixes - this is just a workaround for a framework bug
        this.formGroup.patchValue({firstPublished: DateTime.fromJSDate(book.firstPublished.toJSDate())});
        this.imageUrl = this.imageService.createImageUrlFromBlob(book.image);
      },
      error: (error) => {
        this.globalMessageService.setAlertMessage("danger", "Unable to load Author: ", error);
        console.log("loadAuthor ERROR", error);
        this.isLoading = false;
      }
    });
  }


  deleteBook() {
    console.log("deleteBook");
    deleteBook(this.id)
  }
}
