import {Component, OnInit} from '@angular/core';
import Author from '@mock-backend/author/Author';
import {ActivatedRoute, Router} from '@angular/router';
import {findAuthorById} from '@mock-backend/author/author-mock-data';
import {EnrichedAuthor, enrichWithCalculatedFields} from '../author-util';
import {ImageService} from '../image.service';
import {SafeUrl} from '@angular/platform-browser';
import {GlobalMessageService} from '@core/global-message.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {
  isLoading = false;
  authorId?: number;
  author?: EnrichedAuthor;
  imageUrl?: SafeUrl;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private globalMessageService: GlobalMessageService,
              private authorService: ImageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log("params", params, params["id"]);
      this.loadAuthor(Number(params["id"]));
    });
  }

  get fullname() {
    return this.author?.firstname + " " + this.author?.lastname;
  }

  //TODO extract past of it to shared service
  loadAuthor(id: number) {
    this.authorId = id;
    this.isLoading = true;
    findAuthorById(id).subscribe({
      next: (author: Author) => {
        console.log("loadAuthor SUCCESS", author);
        this.isLoading = false;
        this.author = enrichWithCalculatedFields(author);
        this.imageUrl = this.authorService.createImageUrlFromBlob(author.foto);
      },
      error: (error) => {
        this.globalMessageService.setAlertMessage("danger", "Unable to load Author: ", error);
        console.log("loadAuthor ERROR", error);
        this.isLoading = false;
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
