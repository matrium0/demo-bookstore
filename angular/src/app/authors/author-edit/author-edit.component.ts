import {Component, OnInit} from '@angular/core';
import Author from '../../../../../mock-backend/author/Author';
import {findById} from '../../../../../mock-backend/author/AuthorMockService';
import {ActivatedRoute} from '@angular/router';
import {GlobalMessageService} from '../../core/global-message.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit {
  author?: Author;

  constructor(private activatedRoute: ActivatedRoute, private globalMessageService: GlobalMessageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
        params => {
          const id = params['id'];
          if (id === "new") {
            //TODO create new author
            // author = new Author();

          }else{
            this.loadAuthor(id);
          }
        }
    )

  }

  loadAuthor(id: number) {
    findById(id).subscribe({
      next: (author: Author) => {
        console.log("findById", author);
        this.author = author;
      },
      error: (error) => {
        this.globalMessageService.setAlertMessage("danger", "Unable to load Authors: ", error);
        console.log("error occured");
      }
    });
  }

}
