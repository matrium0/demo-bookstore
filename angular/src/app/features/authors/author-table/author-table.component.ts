import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {EnrichedAuthor} from '@mock-backend/author/EnrichedAuthor';
import {booleanCompare, compare, dateCompare} from '@shared/util/sort-utility';

@Component({
  selector: 'app-author-table',
  templateUrl: './author-table.component.html',
  styleUrls: ['./author-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorTableComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if (window.innerWidth >= 992) {
      this.showAllDetails = true;
      this.displayedColumns = ['firstname', 'lastname', 'gender', 'penName', 'birthdateWithPlace', 'age', 'dateOfDeath'];
    } else if (window.innerWidth >= 576) {
      this.showAllDetails = true;
      this.displayedColumns = ['firstname', 'lastname', 'birthdate', 'gender'];
    } else {
      this.showAllDetails = false;
      this.displayedColumns = ['firstname', 'lastname'];
    }
  }

  _authors: EnrichedAuthor[] = [];
  sortedAuthors: EnrichedAuthor[] = [];
  showAllDetails = false;
  private sort: Sort;

  displayedColumns: string[] = [];

  @Output()
  selectAuthor = new EventEmitter<EnrichedAuthor>();

  @Input()
  set authors(authors: EnrichedAuthor[]) {
    this._authors = authors;
    this.sortData(this.sort);
  }

  constructor() {
    this.sort = {active: "lastname", direction: "asc"}; // default sort
  }

  ngOnInit(): void {
    this.getScreenSize();
  }

  onAuthorSelect(author: EnrichedAuthor) {
    this.selectAuthor.next(author);
  }

  sortData(sort: Sort) {
    this.sort = sort;
    const data = this._authors.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedAuthors = data;
      return;
    }

    this.sortedAuthors = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'age':
          return compare(a.age!, b.age!, isAsc);
        case 'firstname':
          return compare(a.firstname!, b.firstname!, isAsc);
        case 'lastname':
          return compare(a.lastname!, b.lastname!, isAsc);
        case 'penName':
          return booleanCompare(a.penName!, b.penName!, isAsc);
        case 'birthdate':
        case 'birthdateWithPlace':
          return dateCompare(a.birthdate, b.birthdate, isAsc);
        case 'gender':
          return compare(a.gender!, b.gender!, isAsc);
        case 'dateOfDeath':
          return dateCompare(a.dateOfDeath, b.dateOfDeath, isAsc);
        default:
          return 0;
      }
    });
  }
}
