import {Component} from '@angular/core';
import {GlobalMessageService} from '../../core/global-message.service';
import {faTimes, faUserCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-global-message',
  templateUrl: './global-message.component.html',
  styleUrls: ['./global-message.component.scss']
})
export class GlobalMessageComponent {
  iconTimes = faTimes;

  constructor(public globalMessageService: GlobalMessageService) {
  }

}
