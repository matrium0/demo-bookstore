import {Component, OnInit} from '@angular/core';
import {Author} from '@mock-backend/author/Author';
import {createOrUpdateAuthor, findAuthorById} from '@mock-backend/author/author-mock-data';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalMessageService} from '@core/global-message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateTime} from 'luxon';
import {ImageCropperDialogComponent} from '../image-cropper-dialog/image-cropper-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ImageService} from '../image.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit {
  isLoading = false;
  displaySaveReminder = false;
  imageUrl?: SafeUrl;

  formGroup = new FormGroup({
    id: new FormControl(null),
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    penName: new FormControl(false, Validators.required),
    birthdate: new FormControl(null, Validators.required),
    placeOfBirth: new FormControl(null),
    dateOfDeath: new FormControl(null),
    placeOfDeath: new FormControl(null),
    website: new FormControl(null),
    note: new FormControl(null),
    genre: new FormControl(null),
    foto: new FormControl(null, Validators.required),
  });

  constructor(private activatedRoute: ActivatedRoute, private globalMessageService: GlobalMessageService, private router: Router,
              private matDialog: MatDialog, private domSanitizer: DomSanitizer, private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        const id = params['id'];
        if (id === "new") {
          this.isLoading = false;
        } else {
          this.loadAuthor(Number(id));
        }
      }
    )
  }

  loadAuthor(id: number) {
    this.isLoading = true;
    findAuthorById(id).subscribe({
      next: (author: Author) => {
        console.log("loadAuthor SUCCESS", author);
        this.isLoading = false;
        this.formGroup.patchValue(author);
        //TODO come back and check for fixes - this is just a workaround for a framework bug
        this.formGroup.patchValue({birthdate: DateTime.fromJSDate(author.birthdate!.toJSDate())});
        if (author.dateOfDeath) {
          this.formGroup.patchValue({dateOfDeath: DateTime.fromJSDate(author.dateOfDeath.toJSDate())});
        }
        this.imageUrl = this.imageService.createImageUrlFromBlob(author.foto!);
      },
      error: (error: HttpErrorResponse) => {
        this.globalMessageService.setAlertMessage("danger", "Unable to load Author: ", error);
        console.log("loadAuthor ERROR", error);
        this.isLoading = false;
      }
    });
  }

  saveAndNavigateToDetailPage() {
    console.log("saveAndNavigateToDetailPage");

    if (this.formGroup.valid) {
      console.log('save', this.formGroup.value);
      createOrUpdateAuthor(this.formGroup.getRawValue()).subscribe(
        (author: Author) => {
          console.log('createOrUpdateAuthor SUCCESS', author);
          this.router.navigate(['/author/' + author.id]).then();
          this.globalMessageService.setAlertMessage("info", "Author saved!");
        }, (error: any) => {
          console.log("saveHero ERROR", error);
          this.globalMessageService.setAlertMessage("danger", "Author saving failed", error);
        });
    } else {
      console.log('formgroup is not valid', this.formGroup);
      this.formGroup.markAllAsTouched();
    }
  }

  openFotoUploadDialog(): void {
    this.matDialog
      .open(ImageCropperDialogComponent, {height: "550px"})
      .afterClosed()
      .subscribe((imageBlob: Blob) => {
        if (imageBlob) {
          console.log("image chosen", imageBlob);
          this.imageUrl = this.imageService.createImageUrlFromBlob(imageBlob);
          this.formGroup.patchValue({foto: imageBlob})
          console.log("this.imageUrl ", this.imageUrl);
          if (this.formGroup.get("id")?.value) {
            this.displaySaveReminder = true;
          }
        }
      });
  }

  showUnsupportedOperationMessage() {
    this.globalMessageService.setAlertMessage("info", "Sorry, this operation is not supported yet");
  }

  navigateBack() {
    history.back();
  }

  get fullname() {
    return this.formGroup.get("firstname")?.value + " " + this.formGroup.get("lastname")?.value;
  }
}
