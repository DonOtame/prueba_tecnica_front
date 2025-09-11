import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  private translate = inject(TranslateService);

  async delete(): Promise<boolean> {
    const title = this.translate.instant('SWAL.CONFIRM_DELETE_TITLE');
    const text = this.translate.instant('SWAL.CONFIRM_DELETE_TEXT');
    const confirmButtonText = this.translate.instant('SWAL.CONFIRM_BUTTON_TEXT');
    const cancelButtonText = this.translate.instant('SWAL.CANCEL_BUTTON_TEXT');

    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true,
    });

    return result.isConfirmed === true;
  }
}
