import { AbstractControl } from '@angular/forms';
import { ToastService } from '@app/core/services';

export const validateForm = (
  form: AbstractControl,
  toast: ToastService,
  message: string = 'TOAST.FIELDS_REQUIRED'
): boolean => {
  if (form.invalid) {
    form.markAllAsTouched();
    toast.show(message, 'error');
    return false;
  }
  return true;
};
