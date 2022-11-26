import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniButtonComponent } from './uni-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    UniButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    UniButtonComponent
  ]
})
export class UniButtonModule { }
