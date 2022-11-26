import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  OrganizationInfoPageComponent
} from '@pages/organizations-list-page/organization-info-page/organization-info-page.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationInfoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationInfoPageRoutingModule {}
