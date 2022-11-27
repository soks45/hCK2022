import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page.component';
import { RegistrationPageRoutingModule } from '@pages/registration-page/registration-page-routing.module';



@NgModule({
  declarations: [
    RegistrationPageComponent
  ],
  imports: [
    CommonModule,
    RegistrationPageRoutingModule
  ]
})
export class RegistrationPageModule { }
