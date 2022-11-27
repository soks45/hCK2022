import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestPageSuccessComponent } from '@pages/request-page/request-page-success/request-page-success.component';

const routes: Routes = [
  {
    path: '',
    component: RequestPageSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestPageSuccessRoutingModule {}
