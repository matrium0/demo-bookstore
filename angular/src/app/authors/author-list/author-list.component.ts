import {Component, OnInit} from '@angular/core';
import Author from '../../../../../mock-backend/author/Author';
import {findAllAuthors} from '@mock-backend/author/AuthorMockService';
import {GlobalMessageService} from '@core/global-message.service';
import {EnrichedAuthor, enrichWithCalculatedFields} from '../author-util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {
  authors?: EnrichedAuthor[];
  filteredAuthors?: EnrichedAuthor[];

  constructor(private globalMessageService: GlobalMessageService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadAllAuthors();
  }

  loadAllAuthors() {
    findAllAuthors().subscribe({
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

  onAuthorSelected(author: EnrichedAuthor) {
    console.log("onAuthorSelected", author);
    this.router.navigate(["/author/" + author.id]);
  }

  navigateToNewAuthor() {
    console.log("navigateToNewAuthor");
    this.router.navigate(["/author/edit/new"]);
  }
}
