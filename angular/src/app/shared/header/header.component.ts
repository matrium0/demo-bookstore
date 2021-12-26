import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed = true;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
  }

  handleLogoutClick() {

  }
}
