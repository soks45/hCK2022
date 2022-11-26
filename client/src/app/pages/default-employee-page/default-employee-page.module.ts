import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultEmployeePageComponent } from './default-employee-page.component';
import { DefaultEmployeePageRoutingModule } from '@pages/default-employee-page/default-employee-page-routing.module';



@NgModule({
  declarations: [
    DefaultEmployeePageComponent
  ],
  imports: [
    CommonModule,
    DefaultEmployeePageRoutingModule
  ]
})
export class DefaultEmployeePageModule { }
