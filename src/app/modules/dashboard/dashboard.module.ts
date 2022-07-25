import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { SideBarComponent } from 'src/app/core/components/side-bar/side-bar.component';

@NgModule({
  declarations: [DashboardComponent, MapComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeaderComponent,
    SideBarComponent,
  ],
})
export class DashboardModule {}
