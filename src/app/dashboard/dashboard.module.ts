import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { CommonItemModule } from '../common-item/common-item.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    OverviewComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CommonItemModule,
    FormsModule,
    DataTablesModule
  ],
})
export class DashboardModule {}
