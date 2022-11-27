import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestPageComponent } from '@pages/request-page/request-page.component';
import { EmployeeGuard } from '../../auth/guards/employee.guard';

const routes: Routes = [
  {
    path: '',
    component: RequestPageComponent,
  },
  {
    path: 'success',
    loadChildren: () => import('@pages/request-page/request-page-success/request-page-success.module').then((m) => m.RequestPageSuccessModule),
    canActivate: [EmployeeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestPageRoutingModule {}
