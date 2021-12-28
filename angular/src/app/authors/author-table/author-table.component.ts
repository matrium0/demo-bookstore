import {ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';
import Author from '../../../../../shared/author/Author';
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

  columns: string[] = ['firstname', 'lastname', 'birthdate'];
  columnsLargeScreens: string[] = ['firstname', 'lastname', 'isPenName', 'birthdateWithPlace', 'gender', 'age', 'dateOfDeath'];
  displayedColumns: string[] = [];

  constructor() {
    this.getScreenSize();
  }

  ngOnInit(): void {
  }

  sortData($event: Sort) {
    //TODO implement
    console.log("sortData", $event)

  }
}
