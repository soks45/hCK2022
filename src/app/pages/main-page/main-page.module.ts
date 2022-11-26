import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from "@pages/main-page/main-page-routing.module";
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderModule } from '@ui/header/header.module';



@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MatSidenavModule,
    HeaderModule
  ]
})
export class MainPageModule { }
