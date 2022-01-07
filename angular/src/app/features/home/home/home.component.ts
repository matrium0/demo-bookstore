import {Component} from '@angular/core';
import {GlobalMessageService} from '@core/global-message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private globalMessageService: GlobalMessageService) {
  }

  generateDemoMessage() {
    this.globalMessageService.setAlertMessage("info", "a bright new message of medium length");
  }

}
