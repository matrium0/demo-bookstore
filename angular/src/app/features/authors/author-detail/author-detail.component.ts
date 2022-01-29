import {Component, OnInit} from '@angular/core';
import {Author} from '@mock-backend/author/Author';
import {ActivatedRoute, Router} from '@angular/router';
import {findAuthorById} from '@mock-backend/author/author-mock-data';
import {enrichWithCalculatedFields} from '@mock-backend/author/author-util';
import {ImageService} from '../image.service';
import {SafeUrl} from '@angular/platform-browser';
import {GlobalMessageService} from '@core/global-message.service';
import {Book} from '@mock-backend/book/Book';
import {findBooksOfAuthor} from '@mock-backend/book/book-mock-data';
import {HttpErrorResponse} from '@angular/common/http';
import {EnrichedAuthor} from '@mock-backend/author/EnrichedAuthor';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {
  isLoading = false;
  isBooksLoading = false;
  authorId?: number;
  author?: EnrichedAuthor;
  imageUrl?: SafeUrl;
  books?: Book[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private globalMessageService: GlobalMessageService,
              private authorService: ImageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const authorId = params["id"];
      console.log("params", params, authorId);
      this.loadAuthor(Number(authorId));
      this.loadBooksForAuthor(Number(authorId));
    });
  }

  get fullname() {
    return this.author?.firstname + " " + this.author?.lastname;
  }

  loadAuthor(id: number) {
    this.authorId = id;
    this.isLoading = true;
    findAuthorById(id).subscribe({
      next: (author: Author) => {
        console.log("loadAuthor SUCCESS", author);
        this.isLoading = false;
        this.author = enrichWithCalculatedFields(author);
        this.imageUrl = this.authorService.createImageUrlFromBlob(author.foto!);
      },
      error: (error: HttpErrorResponse) => {
        this.globalMessageService.setAlertMessage("danger", "Unable to load Author: ", error);
        console.log("loadAuthor ERROR", error);
        this.isLoading = false;
      }
    });
  }

  loadBooksForAuthor(id: number) {
    this.isBooksLoading = true;
    findBooksOfAuthor(id).subscribe({
      next: (books: Book[]) => {
        console.log("loadBooksForAuthor SUCCESS", books);
        this.isBooksLoading = false;
        this.books = books;
      },
      error: (error: HttpErrorResponse) => {
        this.globalMessageService.setAlertMessage("danger", "Unable to load Books of Author: ", error);
        console.log("loadBooksForAuthor ERROR", error);
        this.isBooksLoading = false;
      }
    });
  }

  navigateToMasterPage() {
    this.router.navigate(["/author"]);
  }

  navigateToEditPage() {
    this.router.navigate(["/author/edit/" + this.authorId]);
  }

}
