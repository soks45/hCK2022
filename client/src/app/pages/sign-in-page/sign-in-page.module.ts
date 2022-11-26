import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SignInFormModule } from '@pages/sign-in-page/components/sign-in-form/sign-in-form.module';
import { SignInPageRoutingModule } from '@pages/sign-in-page/sign-in-page-routing.module';
import { SignInPageComponent } from './sign-in-page.component';

@NgModule({
    declarations: [SignInPageComponent],
    imports: [CommonModule, SignInPageRoutingModule, SignInFormModule],
})
export class SignInPageModule {}
