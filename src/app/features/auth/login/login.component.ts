import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorResponse } from '@app/core/models';
import { AuthFacadeService, ToastService } from '@app/core/services';
import { LoadingSpinnerComponent } from '@app/shared/components/loading-gif/loading-spinner.component';
import { PasswordEyeComponent } from '@app/shared/components/password-eye/password-eye.component';
import { wait, validateForm, handleAsync, handleError } from '@app/shared/utils';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    PasswordEyeComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private authFacade = inject(AuthFacadeService);
  private toast = inject(ToastService);
  private router = inject(Router);

  public showPassword = signal<boolean>(false);

  public isLoading = signal<boolean>(false);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  async onLogIn() {
    if (!validateForm(this.loginForm, this.toast)) return;

    const { username, password } = this.loginForm.value;
    this.isLoading.set(true);

    const result = await handleAsync(
      this.authFacade.login(username!, password!)
      // this.toast,
      // 'TOAST.LOGIN_ERROR'
    );

    if ((result as ErrorResponse)?.status) {
      this.isLoading.set(false);
      handleError(result as ErrorResponse, this.toast, 'LOGIN');
      return;
    }

    await wait(300);
    this.toast.show('TOAST.LOGIN_SUCCESS', 'success');
    this.router.navigate(['/']);
    this.isLoading.set(false);
  }
}
