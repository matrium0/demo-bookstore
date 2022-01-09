import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserBookAssignmentStatus} from '@mock-backend/user/user-book-assignment-status';


@Component({
  selector: 'app-is-in-library-marker',
  templateUrl: './is-in-library-marker.component.html',
  styleUrls: ['./is-in-library-marker.component.scss']
})
export class IsInLibraryMarkerComponent implements OnInit {
  isMenuCollapsed = false;

  @Input() status?: UserBookAssignmentStatus;

  @Output() statusChange = new EventEmitter<UserBookAssignmentStatus>();

  ngOnInit(): void {
    if (!this.status) {
      throw new Error("IsInLibraryMarkerComponent rewuires currentStatus to be set");
    }
  }

  changeStatus(status: UserBookAssignmentStatus) {
    this.isMenuCollapsed = false;
    this.statusChange.next(status)
  }
}
