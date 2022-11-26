import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInFormComponent } from '@pages/main-page/components/sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  constructor(private dialog: MatDialog) {
  }

  signIn(): void {
    this.dialog.open(SignInFormComponent);
  }
}
