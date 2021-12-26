import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/user.service';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  iconUserCircle = faUserCircle;
  isMenuCollapsed = true;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
  }

  handleLogoutClick() {

  }
}
