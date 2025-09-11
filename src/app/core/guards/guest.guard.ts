import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthFacadeService } from '../services';

export const guestGuard: CanActivateFn = (route, state) => {
  const authFacade = inject(AuthFacadeService);
  const router = inject(Router);

  if (authFacade.isSessionValid()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
