import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LibraryRoutingModule} from './library-routing.module';
import {LibraryComponent} from './library/library.component';
import {SharedModule} from '../shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import * as library from "../.store/library.reducers";
import {LibraryEffects} from '../.store/library.effects';


@NgModule({
  declarations: [
    LibraryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature( [LibraryEffects]),
    StoreModule.forFeature(library.projectFeatureKey, library.reducer),
    LibraryRoutingModule
  ]
})
export class LibraryModule {
}
