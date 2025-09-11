import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthFacadeService, ToastService } from '@app/core/services';
import { LoadingSpinnerComponent } from '@app/shared/components/loading-gif/loading-spinner.component';
import { wait, handleError, validateForm, handleAsync } from '@app/shared/utils';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    LoadingSpinnerComponent,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private authFacade = inject(AuthFacadeService);
  private toast = inject(ToastService);
  private router = inject(Router);

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
      this.authFacade.login(username!, password!),
      this.toast,
      'TOAST.LOGIN_ERROR'
    );

    if (result instanceof Error) {
      this.isLoading.set(false);
      return;
    }

    await wait(300);
    this.toast.show('TOAST.LOGIN_SUCCESS', 'success');
    this.router.navigate(['/']);
    this.isLoading.set(false);
  }
}
