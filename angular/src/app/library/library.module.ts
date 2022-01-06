import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LibraryRoutingModule} from './library-routing.module';
import {LibraryComponent} from './library/library.component';
import {SharedModule} from '../shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import * as library from "../reducers/library.store";
import {LibraryEffects} from "../reducers/library.store";


@NgModule({
  declarations: [
    LibraryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // EffectsModule.forFeature([LibraryEffects]), //TODO add effects
    StoreModule.forFeature(library.projectFeatureKey, library.reducer),
    LibraryRoutingModule
  ]
})
export class LibraryModule {
}
