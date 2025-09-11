import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { toast } from 'ngx-sonner';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private translate = inject(TranslateService);

  show(message: string, type: ToastType = 'default') {
    const translatedMessage = this.translate.instant(message);
    switch (type) {
      case 'success':
        toast.success(translatedMessage);
        break;
      case 'error':
        toast.error(translatedMessage);
        break;
      case 'info':
        toast.info(translatedMessage);
        break;
      case 'warning':
        toast.warning(translatedMessage);
        break;
      default:
        toast(translatedMessage);
    }
  }
}
