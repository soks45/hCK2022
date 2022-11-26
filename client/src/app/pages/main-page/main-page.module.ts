import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from '@pages/main-page/main-page-routing.module';
import { UniButtonModule } from '@ui/uni-button/uni-button.module';
import { SignInFormModule } from '@pages/main-page/components/sign-in-form/sign-in-form.module';


@NgModule({
  declarations: [
    MainPageComponent
  ],
    imports: [
      CommonModule,
      MainPageRoutingModule,
      UniButtonModule,
      SignInFormModule
    ]
})
export class MainPageModule { }
