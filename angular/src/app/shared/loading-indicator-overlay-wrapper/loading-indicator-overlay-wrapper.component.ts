import {Component, Input} from '@angular/core';
import {SizeProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-loading-indicator-overlay-wrapper',
  templateUrl: './loading-indicator-overlay-wrapper.component.html',
  styleUrls: ['./loading-indicator-overlay-wrapper.component.scss'],
})
export class LoadingIndicatorOverlayWrapperComponent {
  @Input() showOverlay = false;
  @Input() spinnerSize: SizeProp = "3x";

}
