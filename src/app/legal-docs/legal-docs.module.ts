import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalDocsRoutingModule } from './legal-docs-routing.module';
import { CommonItemModule } from '../common-item/common-item.module';
import { LegaHistoryComponent } from './lega-history/lega-history.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { LegalFormViewComponent } from './legal-form-view/legal-form-view.component';
import { TableLdComponent } from './table-ld/table-ld.component';
import { CsTeamFlowModule } from './cs-team-flow/cs-team-flow.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DailogTableComponent } from './dailog-table/dailog-table.component';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { NotificationComponent } from './notification/notification.component';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  declarations: [
    LegaHistoryComponent,
    LegalFormViewComponent,
    TableLdComponent,
    DailogTableComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    LegalDocsRoutingModule,
    TabViewModule,
    TableModule,
    DataTablesModule,
    TabsModule,
    FormsModule,
    CommonItemModule,
    CsTeamFlowModule,
    OverlayPanelModule,
    DialogModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    CardModule,
    FileUploadModule,
    BadgeModule,
  ],
  exports: [TableLdComponent],
})
export class LegalDocsModule {}
