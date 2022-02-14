import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CsTeamFlowRoutingModule } from './cs-team-flow-routing.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { CommonItemModule } from 'src/app/common-item/common-item.module';
import { CsTaskViewComponent } from './task-view/task-view.component';
import { FormsModule } from '@angular/forms';
import { TableLdComponent } from '../table-ld/table-ld.component';
import { LegalDocsModule } from '../legal-docs.module';
import { CsTableComponent } from './cs-table/cs-table.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  declarations: [CsTaskViewComponent, CsTableComponent],
  imports: [
    CommonModule,
    CsTeamFlowRoutingModule,
    TabsModule,
    ToastrModule,
    DataTablesModule,
    CommonItemModule,
    FormsModule,
    TableModule,
    DialogModule,
    FileUploadModule
  ]
})
export class CsTeamFlowModule { }
