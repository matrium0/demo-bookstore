import {Component} from '@angular/core';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '@core/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  iconUserCircle = faUserCircle;
  isMenuCollapsed = true;

  constructor(public userService: UserService) {
  }

  handleLogoutClick() {

  }
}
