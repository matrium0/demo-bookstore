import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {createOrUpdateBook, deleteBook, findBookById} from '@mock-backend/book/book-mock-data';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalMessageService} from '@core/global-message.service';
import {DateTime} from 'luxon';
import {Book} from '@mock-backend/book/Book';
import {ImageService} from '@app/features/authors/image.service';
import {SafeUrl} from '@angular/platform-browser';
import {ImageCropperDialogComponent} from '@app/features/authors/image-cropper-dialog/image-cropper-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import Author from '@mock-backend/author/Author';
import {findAllAuthors} from '@mock-backend/author/author-mock-data';
import {Observable} from 'rxjs';
import {enrichBookWithUserAssignments} from '@core/book-utils';
import {UserService} from '@core/user.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  isLoading = false;
  imageUrl?: SafeUrl;
  authors$?: Observable<Author[]>;
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
  displaySaveReminder = false;

  constructor(private activatedRoute: ActivatedRoute, private globalMessageService: GlobalMessageService,
              private imageService: ImageService, private router: Router, private matDialog: MatDialog, private userService: UserService) {
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

  ngOnInit(): void {
    this.authors$ = findAllAuthors();
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
        book = enrichBookWithUserAssignments(book, this.userService.authentication$.getValue())
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
    deleteBook(Number(this.id)).subscribe({
          next: () => {
            console.log("deleteBook SUCCESS");
            this.router.navigate(["/library"])
            this.globalMessageService.setAlertMessage("info", "Successfully deleted " + this.title);
          },
          error: (error) => {
            console.log("deleteBook ERROR", error);
            this.globalMessageService.setAlertMessage("danger", "Unable to delete Book: ", error);
          }
        }
    );
  }

  navigateBack() {
    history.back();
  }

  saveAndNavigateBack() {
    console.log("saveAndNavigateToDetailPage");

    if (this.formGroup.valid) {
      console.log('save', this.formGroup.value);
      createOrUpdateBook(this.formGroup.getRawValue()).subscribe(
          (book: Book) => {
            console.log('createOrUpdateBook SUCCESS', book);
            history.back();
            this.globalMessageService.setAlertMessage("info", "Book saved!");
          }, (error: any) => {
            console.log("createOrUpdateBook ERROR", error);
            this.globalMessageService.setAlertMessage("danger", "Book saving failed", error);
          });
    } else {
      console.log('formgroup is not valid', this.formGroup);
      this.formGroup.markAllAsTouched();
    }
  }

  openFotoUploadDialog() {
    this.matDialog
        .open(ImageCropperDialogComponent, {height: "550px"})
        .afterClosed()
        .subscribe((imageBlob: Blob) => {
          if (imageBlob) {
            console.log("image chosen", imageBlob);
            this.imageUrl = this.imageService.createImageUrlFromBlob(imageBlob);
            this.formGroup.patchValue({image: imageBlob})
            console.log("this.imageUrl ", this.imageUrl);
            if (this.formGroup.get("id")?.value) {
              this.displaySaveReminder = true;
            }
          }
        });
  }

  clearInputIfNoAuthorWasSelected($event: FocusEvent, allAuthors?: Author[] | null) {
    const inputElement = $event.target as HTMLInputElement;
    const newAuthorFullname = inputElement.value;
    const index = allAuthors?.map(a => a.firstname + " " + a.lastname).indexOf(newAuthorFullname);
    if (index === -1) {
      console.log("no author was selected, clearing the input");
      this.formGroup.controls['authorId'].setValue(null);
      this.formGroup.controls['authorFullName'].setValue(null);
    } else {
      const selectedAuthor = allAuthors![index!];
      this.formGroup.controls['authorId'].setValue(selectedAuthor.id);
    }
  }

}
