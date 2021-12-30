import {Component, OnInit} from '@angular/core';
import Author from '../../../../../mock-backend/author/Author';
import {findAll} from '../../../../../mock-backend/author/AuthorMockService';
import {GlobalMessageService} from '../../core/global-message.service';
import {EnrichedAuthor, enrichWithCalculatedFields} from '../author-util';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {
  authors?: EnrichedAuthor[];
  filteredAuthors?: EnrichedAuthor[] = [];

  constructor(private globalMessageService: GlobalMessageService) {
  }

  ngOnInit(): void {
    this.loadAllAuthors();
  }

  loadAllAuthors() {
    findAll().subscribe({
      next: (authors: Author[]) => {
        console.log("findAll", authors);
        this.authors = authors.map(a => enrichWithCalculatedFields(a));
        this.filteredAuthors = this.authors;
      },
      error: (error) => {
        this.globalMessageService.setAlertMessage("danger", "Unable to load Authors: ", error);
        console.log("error occured");
      }
    });
  }

  filter(term: string) {
    console.log("filter", term);
    this.filteredAuthors = this.authors?.filter(a =>
        (a.firstname + " " + a.lastname).toLocaleLowerCase().includes(term) ||
        (a.lastname + " " + a.firstname).toLocaleLowerCase().includes(term)
    );
  }

}
