import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { InitatorFormComponent } from './initator-form/initator-form.component';


const routes: Routes = [

  {
    path: 'form', component: InitatorFormComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitiatorRoutingModule { }
