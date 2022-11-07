import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { SideBarComponent } from 'src/app/core/components/side-bar/side-bar.component';
import { StoreModule } from '@ngrx/store';
import * as from from 'src/app/core/store/reducers/devices.reducers';
import { EffectsModule } from '@ngrx/effects';
import { DevicesEffects } from 'src/app/core/store/effects/devices.effects';

@NgModule({
  declarations: [DashboardComponent, MapComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeaderComponent,
    SideBarComponent,
    StoreModule.forFeature(from.FeatureKey, from.updateDevicesReducer),
    EffectsModule.forFeature([DevicesEffects]),
  ],
})
export class DashboardModule {}
