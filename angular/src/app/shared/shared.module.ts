import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {GlobalMessageComponent} from './global-message/global-message.component';
import {GenderIconComponent} from './gender-icon/gender-icon.component';
import {LoadingIndicatorOverlayWrapperComponent} from './loading-indicator-overlay-wrapper/loading-indicator-overlay-wrapper.component';
import {ReactiveValidationDisplayComponent} from './reactive-validation-display/reactive-validation-display.component';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    HeaderComponent,
    GlobalMessageComponent,
    GenderIconComponent,
    LoadingIndicatorOverlayWrapperComponent,
    ReactiveValidationDisplayComponent
  ],
  exports: [
    HeaderComponent,
    GlobalMessageComponent,
    GenderIconComponent,
    FontAwesomeModule,
    LoadingIndicatorOverlayWrapperComponent,
    ReactiveValidationDisplayComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    BsDropdownModule,
    FontAwesomeModule,
    MatFormFieldModule,
  ]
})
export class SharedModule {
}
