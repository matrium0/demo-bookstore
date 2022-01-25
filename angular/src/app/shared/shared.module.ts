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
import {ConfirmationDirective} from './confirmation-dialog/confirmation.directive';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {BookCardComponent} from './book-card/book-card.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {BookDetailDialogWrapperComponent} from './book-detail-dialog-wrapper/book-detail-dialog-wrapper.component';
import {IsInLibraryMarkerComponent} from './is-in-library-marker/is-in-library-marker.component';


@NgModule({
  declarations: [
    HeaderComponent,
    GlobalMessageComponent,
    GenderIconComponent,
    LoadingIndicatorOverlayWrapperComponent,
    ReactiveValidationDisplayComponent,
    ConfirmationDialogComponent,
    ConfirmationDirective,
    BookCardComponent,
    BookDetailComponent,
    BookDetailDialogWrapperComponent,
    IsInLibraryMarkerComponent
  ],
  exports: [
    HeaderComponent,
    GlobalMessageComponent,
    GenderIconComponent,
    FontAwesomeModule,
    LoadingIndicatorOverlayWrapperComponent,
    ReactiveValidationDisplayComponent,
    ConfirmationDialogComponent,
    ConfirmationDirective,
    BookCardComponent
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
