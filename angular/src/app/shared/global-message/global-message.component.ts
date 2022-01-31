import {Component} from '@angular/core';
import {GlobalMessageService} from '@core/global-message.service';

@Component({
  selector: 'app-global-message',
  templateUrl: './global-message.component.html',
  styleUrls: ['./global-message.component.scss']
})
export class GlobalMessageComponent {

  constructor(public globalMessageService: GlobalMessageService) {
  }

}
