import type { HttpInterceptorFn } from '@angular/common/http';
import { AuthFacadeService } from '../services';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/auth/')) {
    return next(req);
  }

  const authFacade = inject(AuthFacadeService);
  const token = authFacade.isSessionValid() ? authFacade.getToken() : null;

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;
  return next(authReq);
};
