import {Component, OnInit} from '@angular/core';
import {GlobalMessageService} from '@core/global-message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private globalMessageService: GlobalMessageService) { }

  ngOnInit(): void {
  }

  generateDemoMessage(){
    this.globalMessageService.setAlertMessage("info", "a bright new message of medium length");
  }

}
