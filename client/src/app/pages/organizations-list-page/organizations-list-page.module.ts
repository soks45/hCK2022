import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsListPageComponent } from './organizations-list-page.component';
import {
  OrganizationsListPageRoutingModule
} from '@pages/organizations-list-page/organizations-list-page-routing.module';



@NgModule({
  declarations: [
    OrganizationsListPageComponent
  ],
  imports: [
    CommonModule,
    OrganizationsListPageRoutingModule
  ]
})
export class OrganizationsListPageModule { }
