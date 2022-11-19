import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { SideBarComponent } from 'src/app/core/components/side-bar/side-bar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DevicesEffects } from 'src/app/core/store/effects/devices.effects';
import { dashboardReducers } from 'src/app/core/store/reducers-map';
import { RecordsEffects } from 'src/app/core/store/effects/records.effects';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeaderComponent,
    SideBarComponent,
    ActivityLogComponent,
    MapComponent,
    UserModule,
    StoreModule.forFeature('operation', dashboardReducers),
    EffectsModule.forFeature([DevicesEffects, RecordsEffects]),
  ],
})
export class DashboardModule {}
