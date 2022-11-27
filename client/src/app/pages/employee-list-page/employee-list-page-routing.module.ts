import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListPageComponent } from '@pages/employee-list-page/employee-list-page.component';
import { OrganizationGuard } from '../../auth/guards/organization.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListPageComponent,
  },
  {
    path: 'edit',
    loadChildren: () => import('@pages/employee-list-page/edit-employee-page/edit-employee-page.module').then((m) => m.EditEmployeePageModule),
    canActivate: [OrganizationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeListPageRoutingModule {}
