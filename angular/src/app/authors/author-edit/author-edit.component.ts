import {Component, OnInit} from '@angular/core';
import Author from '../../../../../mock-backend/author/Author';
import {findById} from '../../../../../mock-backend/author/AuthorMockService';
import {ActivatedRoute} from '@angular/router';
import {GlobalMessageService} from '../../core/global-message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit {
  author?: Author;

  formGroup = new FormGroup({
    id: new FormControl(null),
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    penName: new FormControl(null, Validators.required),
    birthdate: new FormControl(null, Validators.required),
    placeOfBirth: new FormControl(),
    dateOfDeath: new FormControl(),
    placeOfDeath: new FormControl(),
    website: new FormControl(),
  });

  constructor(private activatedRoute: ActivatedRoute, private globalMessageService: GlobalMessageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
        params => {
          const id = params['id'];
          if (id === "new") {
            //TODO create new author
            // author = new Author();

          } else {
            this.loadAuthor(Number(id));
          }
        }
    )

  }

  loadAuthor(id: number) {
    findById(id).subscribe({
      next: (author: Author) => {
        this.author = author;
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
      }
    });
  }
}
