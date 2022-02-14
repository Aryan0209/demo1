import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsTaskViewComponent } from './task-view/task-view.component';


const routes: Routes = [

  {
    path: 'task-view/:id/:st', component: CsTaskViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsTeamFlowRoutingModule { }
