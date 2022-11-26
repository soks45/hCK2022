import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultEmployeePageComponent } from '@pages/default-employee-page/default-employee-page.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultEmployeePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultEmployeePageRoutingModule {}
