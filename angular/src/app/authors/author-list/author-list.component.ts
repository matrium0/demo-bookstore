import {Component, OnInit} from '@angular/core';
import Author from '../../../../../mock-backend/author/Author';
import {findAll} from '../../../../../mock-backend/author/AuthorMockService';
import {GlobalMessageService} from '../../core/global-message.service';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {
  authors?: Author[];

  constructor(private globalMessageService: GlobalMessageService) {
  }

  ngOnInit(): void {
    this.loadAllAuthors();
  }

  loadAllAuthors() {
    findAll().subscribe({
      next: (authors: Author[]) => {
        console.log("findAll", authors);
        this.authors = authors;
      },
      error: (error) => {
        this.globalMessageService.setAlertMessage("danger", "Unable to load Authors: ", error);
        console.log("error occured");
      }
    });
  }

  sortData($event: Sort) {
    console.log("sortData", $event)
  }

}
