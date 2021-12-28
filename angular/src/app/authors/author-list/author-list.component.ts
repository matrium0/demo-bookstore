import {Component, OnInit} from '@angular/core';
import Author from '../../../../../shared/author/Author';
import {findAll} from '../../../../../shared/author/AuthorMockService';
import {GlobalMessageService} from '../../core/global-message.service';

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
}
