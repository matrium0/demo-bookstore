import { Component, OnInit } from '@angular/core';

type status = "want to read" | "read" | "currently reading";

@Component({
  selector: 'app-is-in-library-marker',
  templateUrl: './is-in-library-marker.component.html',
  styleUrls: ['./is-in-library-marker.component.scss']
})
export class IsInLibraryMarkerComponent implements OnInit {
  isMenuCollapsed = false;


  constructor() { }

  ngOnInit(): void {
  }

  changeStatus(read: string) {
    this.isMenuCollapsed = false;
  }
}
