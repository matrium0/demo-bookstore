import {Component, OnInit} from '@angular/core';
import Author from '@mock-backend/author/Author';
import {findAllAuthors} from '@mock-backend/author/author-mock-data';
import {GlobalMessageService} from '@core/global-message.service';
import {enrichWithCalculatedFields} from '@mock-backend/author/author-util';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {EnrichedAuthor} from '@mock-backend/author/EnrichedAuthor';

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
      error: (error: HttpErrorResponse) => {
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
