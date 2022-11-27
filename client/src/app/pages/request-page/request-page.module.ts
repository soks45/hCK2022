import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestPageComponent } from './request-page.component';
import { RequestPageRoutingModule } from '@pages/request-page/request-page-routing.module';



@NgModule({
  declarations: [
    RequestPageComponent
  ],
  imports: [
    CommonModule,
    RequestPageRoutingModule
  ]
})
export class RequestPageModule { }
