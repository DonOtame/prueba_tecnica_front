import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ErrorResponse } from '@app/core/models';
import { AuthFacadeService, ToastService } from '@app/core/services';
import { LoadingSpinnerComponent } from '@app/shared/components/loading-gif/loading-spinner.component';
import { PasswordEyeComponent } from '@app/shared/components/password-eye/password-eye.component';
import { validateForm, handleAsync, wait, handleError } from '@app/shared/utils';
import { TranslateModule } from '@ngx-translate/core';

const passwordMatchValidator = (control: AbstractControl) => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    PasswordEyeComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private authFacade = inject(AuthFacadeService);
  private toast = inject(ToastService);
  private router = inject(Router);

  public showPassword = signal<boolean>(false);

  public isLoading = signal<boolean>(false);

  registerForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(1),
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  async onRegister() {
    if (!validateForm(this.registerForm, this.toast)) return;

    const { username, password } = this.registerForm.value;
    this.isLoading.set(true);

    const result = await handleAsync(
      this.authFacade.register(username!, password!)
      // this.toast,
      // 'TOAST.REGISTER_ERROR'
    );

    if ((result as ErrorResponse).status) {
      this.isLoading.set(false);
      handleError(result as ErrorResponse, this.toast, 'REGISTER');
      return;
    }

    await wait(300);
    this.toast.show('TOAST.REGISTER_SUCCESS', 'success');
    this.router.navigate(['/login']);
    this.isLoading.set(false);
  }
}
