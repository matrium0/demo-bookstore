import {Component, OnInit} from '@angular/core';
import Author from '../../../../../mock-backend/author/Author';
import {createOrUpdate, findById} from '../../../../../mock-backend/author/AuthorMockService';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalMessageService} from '../../core/global-message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateTime} from 'luxon';
import {ImageCropperDialogComponent} from '../image-cropper-dialog/image-cropper-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit {
  isLoading = false;

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
  });
  public imageUrl?: SafeUrl;

  constructor(private activatedRoute: ActivatedRoute, private globalMessageService: GlobalMessageService, private router: Router,
              private matDialog: MatDialog, private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
        params => {
          const id = params['id'];
          if (id === "new") {
          } else {
            this.loadAuthor(Number(id));
          }
        }
    )
  }

  loadAuthor(id: number) {
    this.isLoading = true;
    findById(id).subscribe({
      next: (author: Author) => {
        this.isLoading = false;
        this.formGroup.patchValue(author);
        //workaround for framework bug https://github.com/angular/material/issues/12118
        this.formGroup.patchValue({birthdate: DateTime.fromJSDate(author.birthdate.toJSDate())});
        if (author.dateOfDeath) {
          this.formGroup.patchValue({dateOfDeath: DateTime.fromJSDate(author.dateOfDeath.toJSDate())});
        }
      },
      error: (error) => {
        this.globalMessageService.setAlertMessage("danger", "Unable to load Authors: ", error);
        console.log("error occured");
        this.isLoading = false;
      }
    });
  }

  navigateBack() {
    history.back();
  }

  saveAndNavigateToMasterPage() {
    console.log("saveAndNavigateToMasterPage");

    if (this.formGroup.valid) {
      console.log('save', this.formGroup.value);
      createOrUpdate(this.formGroup.getRawValue()).subscribe(
          (author: Author) => {
            console.log('createOrUpdate SUCCESS', author);
            this.router.navigate(['/author']).then();
            this.globalMessageService.setAlertMessage("success", "Hero saved!");
          }, (error: any) => {
            console.log("saveHero ERROR", error);
            this.globalMessageService.setAlertMessage("danger", "Hero saving failed", error);
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

            //TODO display and save image
            // this.setImage(imageBlob);
            this.imageUrl = this.createImageUrlFromBlob(imageBlob);
            // if (this.formGroup.get("id")?.value) {
            //   this.displaySaveReminder = true;
            // }
          }
        });
  }
  public createImageUrlFromBlob(image: Blob): SafeUrl {
    const objectURL = URL.createObjectURL(image);
    return this.domSanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
