import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-reactive-validation-display',
  templateUrl: './reactive-validation-display.component.html',
  styleUrls: ['./reactive-validation-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveValidationDisplayComponent {
  @Input() control?: AbstractControl | null;

}
