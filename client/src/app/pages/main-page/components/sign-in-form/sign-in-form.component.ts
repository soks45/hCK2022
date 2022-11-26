import { Component, ViewEncapsulation } from '@angular/core';
import { BaseObject, Constructor } from '@mixins/mixins';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormMixin } from '@mixins/form.mixin';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from '../../../../auth';

interface LoginFormControls {
    emailOrInn: string;
    password: string;
}

@Component({
    selector: 'app-sign-in-form',
    templateUrl: './sign-in-form.component.html',
    styleUrls: ['./sign-in-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SignInFormComponent extends FormMixin<Constructor, LoginFormControls>(BaseObject) {
  isLoading = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      emailOrInn: new FormControl('', {
          initialValueIsDefault: true,
          validators: [Validators.required, Validators.maxLength(255)],
        }),
        password: new FormControl('', {
          initialValueIsDefault: true,
          validators: [Validators.required, Validators.maxLength(255)],
        }),
    });
  }

  onSubmit(): void {
    if (!this.checkForm) {
        return;
    }


    const value = this.formGroup.value;

    if (this.isInn(value.emailOrInn)) {
      return;
    }


  }

  private isInn(pin: string | undefined): boolean {
    if (!pin) {
     return false;
    }

    return pin.replace(/[^0-9]/g,"") === pin;
  }
}
