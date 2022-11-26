import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListPageComponent } from './employee-list-page.component';
import { EmployeeListPageRoutingModule } from '@pages/employee-list-page/employee-list-page-routing.module';



@NgModule({
  declarations: [
    EmployeeListPageComponent
  ],
  imports: [
    CommonModule,
    EmployeeListPageRoutingModule
  ]
})
export class EmployeeListPageModule { }
