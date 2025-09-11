import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'password-eye',
  imports: [],
  templateUrl: './password-eye.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordEyeComponent {
  public showPassword = input.required<boolean>();

}
