import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsePageComponent } from './response-page.component';
import { ResponsePageRoutingModule } from '@pages/organizations-list-page/response-page/response-page-routing.module';



@NgModule({
  declarations: [
    ResponsePageComponent
  ],
  imports: [
    CommonModule,
    ResponsePageRoutingModule
  ]
})
export class ResponsePageModule { }
