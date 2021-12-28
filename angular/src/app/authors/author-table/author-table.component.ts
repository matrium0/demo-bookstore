import {ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';
import Author from '../../../../../mock-backend/author/Author';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-author-table',
  templateUrl: './author-table.component.html',
  styleUrls: ['./author-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorTableComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if (window.innerWidth >= 800) {
      this.displayedColumns = this.columnsLargeScreens;
    } else {
      this.displayedColumns = this.columns;
    }
  }

  @Input()
  authors: Author[] = [];
  sortedAuthors: Author[] = [];

  columns: string[] = ['firstname', 'lastname', 'birthdate'];
  columnsLargeScreens: string[] = ['firstname', 'lastname', 'isPenName', 'birthdateWithPlace', 'gender', 'age', 'dateOfDeath'];
  displayedColumns: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.getScreenSize();
    console.log("constructor", this.authors);
    this.sortedAuthors = this.authors;
  }

  sortData(sort: Sort) {
    const data = this.authors.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedAuthors = data;
      return;
    }

    this.sortedAuthors = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstname':
          return this.compare(a.firstname, b.firstname, isAsc);
        case 'lastname':
          return this.compare(a.lastname, b.lastname, isAsc);
        case 'isPenName':
          return this.compare(a.isPenName, b.isPenName, isAsc);
        case 'birthdate':
          return this.compare(a.birthdate, b.birthdate, isAsc);
        case 'gender':
          return this.compare(a.gender, b.gender, isAsc);
          //TODO calculate age after loading
          // case 'age':
          //   return this.compare(a.age, b.age, isAsc);
        case 'dateOfDeath':
          return this.compare(a.dateOfDeath, b.dateOfDeath, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string | Date | boolean | null, b: number | string | Date | boolean | null, isAsc: boolean) {
    if (!a) {
      return -1;
    }
    if (!b) {
      return 1;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}