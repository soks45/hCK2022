import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmployeePageComponent } from '@pages/employee-list-page/edit-employee-page/edit-employee-page.component';

const routes: Routes = [
  {
    path: '',
    component: EditEmployeePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEmployeePageRoutingModule {}
