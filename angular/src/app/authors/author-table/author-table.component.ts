import {ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {EnrichedAuthor} from '../author-util';

@Component({
  selector: 'app-author-table',
  templateUrl: './author-table.component.html',
  styleUrls: ['./author-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorTableComponent implements OnInit {
  showAllDetails = false;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if (window.innerWidth >= 800) {
      this.showAllDetails = true;
      this.displayedColumns = this.columnsLargeScreens;
    } else {
      this.showAllDetails = false;
      this.displayedColumns = this.columns;
    }
  }

  @Input()
  authors: EnrichedAuthor[] = [];
  sortedAuthors: EnrichedAuthor[] = [];

  columns: string[] = ['firstname', 'lastname', 'gender', 'birthdate'];
  columnsLargeScreens: string[] = ['firstname', 'lastname', 'gender', 'isPenName', 'birthdateWithPlace', 'age', 'dateOfDeath'];
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

    console.log("sortData", sort);

    this.sortedAuthors = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'age':
          return this.compare(a.age, b.age, isAsc);
        case 'firstname':
          return this.compare(a.firstname, b.firstname, isAsc);
        case 'lastname':
          return this.compare(a.lastname, b.lastname, isAsc);
        case 'isPenName':
          return this.booleanCompare(a.isPenName, b.isPenName, isAsc);
        case 'birthdate':
        case 'birthdateWithPlace':
          return this.compare(a.birthdate, b.birthdate, isAsc);
        case 'gender':
          return this.compare(a.gender, b.gender, isAsc);
        case 'dateOfDeath':
          console.log(a.dateOfDeath + "  " + b.dateOfDeath, this.compare(a.dateOfDeath, b.dateOfDeath, isAsc));
          return this.compare(a.dateOfDeath, b.dateOfDeath, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string | Date | boolean | null | undefined, b: number | string | Date | boolean | null | undefined, isAsc: boolean) {
    const directionMultiplier = (isAsc ? 1 : -1);
    if (a === b) {
      return 0;
    }
    if (!a) {
      return -1 * directionMultiplier;
    }
    if (!b) {
      return 1 * directionMultiplier;
    }
    return (a < b ? -1 : 1) * directionMultiplier;
  }

  booleanCompare(a: boolean, b: boolean, isAsc: boolean) {
    return (Number(a) - Number(b)) * (isAsc ? -1 : 1);
  }
}
