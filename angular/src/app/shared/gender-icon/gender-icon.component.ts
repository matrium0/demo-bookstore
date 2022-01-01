import {Component, Input} from '@angular/core';
import {faMars, faTransgenderAlt, faVenus} from '@fortawesome/free-solid-svg-icons';
import {SizeProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-gender-icon',
  templateUrl: './gender-icon.component.html',
  styleUrls: ['./gender-icon.component.scss']
})
export class GenderIconComponent {
  @Input() gender?: "MALE" | "FEMALE" | "NON_BINARY";
  @Input() showLabel = false;
  @Input() size: SizeProp = "2x";

  iconFaMars = faMars;
  iconFaVenus = faVenus;
  iconFaTransgenderAlt = faTransgenderAlt;
}
