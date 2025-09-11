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
import { AuthFacadeService, ToastService } from '@app/core/services';
import { LoadingSpinnerComponent } from '@app/shared/components/loading-gif/loading-spinner.component';
import { validateForm, handleAsync, wait } from '@app/shared/utils';
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
    LoadingSpinnerComponent,
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private authFacade = inject(AuthFacadeService);
  private toast = inject(ToastService);
  private router = inject(Router);

  public isLoading = signal<boolean>(false);

  registerForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  async onRegister() {
    if (!validateForm(this.registerForm, this.toast)) return;

    const { username, password } = this.registerForm.value;
    this.isLoading.set(true);

    await handleAsync(
      this.authFacade.register(username!, password!),
      this.toast,
      'TOAST.REGISTER_ERROR'
    );

    await wait(300);
    this.toast.show('TOAST.REGISTER_SUCCESS', 'success');
    this.router.navigate(['/login']);
    this.isLoading.set(false);
  }
}
