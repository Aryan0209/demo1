import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitiatorRoutingModule } from './initiator-routing.module';

import { CommonItemModule } from 'src/app/common-item/common-item.module';

import { InitatorFormComponent } from './initator-form/initator-form.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [InitatorFormComponent],
  imports: [
    CommonModule,
    CommonItemModule,
    InitiatorRoutingModule,
    TabsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    DialogModule,
    InputTextModule,
    ProgressSpinnerModule,
    FileUploadModule,

  ]
})
export class InitiatorModule { }
