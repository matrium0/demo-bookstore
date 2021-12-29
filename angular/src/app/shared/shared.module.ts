import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {GlobalMessageComponent} from './global-message/global-message.component';
import {GenderIconComponent} from './gender-icon/gender-icon.component';


@NgModule({
  declarations: [
    HeaderComponent,
    GlobalMessageComponent,
    GenderIconComponent
  ],
  exports: [
    HeaderComponent,
    GlobalMessageComponent,
    GenderIconComponent,
    FontAwesomeModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    BsDropdownModule,
    FontAwesomeModule,
  ]
})
export class SharedModule {
}
