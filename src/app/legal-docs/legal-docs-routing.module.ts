import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TesterComponent } from '../tester/tester.component';
import { LegalAuthGuard } from './auth/legal-auth.guard';
import { LegalInitRoleGuard } from './auth/legal-init-role.guard';
import { LegalCsRoleGuard } from './auth/legal-role.guard';
import { LegaHistoryComponent } from './lega-history/lega-history.component';
import { LegalFormViewComponent } from './legal-form-view/legal-form-view.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'test',
    component: TesterComponent,
  },
  {
    path: 'init',
    loadChildren: () =>
      import('./initiator/initiator.module').then((m) => m.InitiatorModule),
    canActivate: [LegalAuthGuard, LegalInitRoleGuard],
  },
  {
    path: 'csteam',
    loadChildren: () =>
      import('./cs-team-flow/cs-team-flow.module').then(
        (m) => m.CsTeamFlowModule
      ),
    canActivate: [LegalAuthGuard, LegalCsRoleGuard],
  },
  {
    path: 'history',
    component: LegaHistoryComponent,
    canActivate: [LegalAuthGuard],
  },
  {
    path: 'l-form-view/:formId/:st',
    component: LegalFormViewComponent,
    canActivate: [LegalAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalDocsRoutingModule {}
