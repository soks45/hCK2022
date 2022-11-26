import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsListPageComponent } from '@pages/organizations-list-page/organizations-list-page.component';
import { SuperUserGuard } from '../../auth/guards/super-user.guard';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsListPageComponent,
  },
  {
    path: 'info',
    loadChildren: () => import('@pages/organizations-list-page/organization-info-page/organization-info-page.module').then((m) => m.OrganizationInfoPageModule),
    canActivate: [SuperUserGuard]
  },
  {
    path: 'response',
    loadChildren: () => import('@pages/organizations-list-page/response-page/response-page.module').then((m) => m.ResponsePageModule),
    canActivate: [SuperUserGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsListPageRoutingModule {}
