import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutGuard } from './tokens/logout.guard';
import { LoginGuard } from './tokens/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/legal-docs/auth/email-validate',
    pathMatch: 'full',
  },
  {
    path: 'legal-docs',
    loadChildren: () =>
      import('./legal-docs/legal-docs.module').then((m) => m.LegalDocsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
