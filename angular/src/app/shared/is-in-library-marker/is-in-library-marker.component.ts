import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserBookAssignmentStatus} from '@mock-backend/user/user-book-assignment-status';
import {faBookmark, faBookReader, faCheck} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-is-in-library-marker',
  templateUrl: './is-in-library-marker.component.html',
  styleUrls: ['./is-in-library-marker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IsInLibraryMarkerComponent implements OnInit {
  isMenuCollapsed = false;

  @Input() status?: UserBookAssignmentStatus;

  @Output() statusChange = new EventEmitter<UserBookAssignmentStatus>();

  iconBookmark = faBookmark;
  iconBookReader = faBookReader;
  iconCheck = faCheck;

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
