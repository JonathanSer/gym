// token.interceptor.ts
import {
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const isAuthRequest =
    req.url.includes('/login') || req.url.includes('/register') || req.url.includes('/refresh');

  const authReq = token && !isAuthRequest
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Solo intenta renovar si es 401, no es refresh ni login
      if (error.status === 401 && !isAuthRequest) {
        return authService.refreshToken().pipe(
          switchMap((res: any) => {
            const newToken = res.token;
            if (newToken) {
              localStorage.setItem('token', newToken);
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next(retryReq); // Reintentar con el nuevo token
            } else {
              // Sin nuevo token => forzar logout
              localStorage.removeItem('token');
              router.navigate(['/login']);
              return throwError(() => error);
            }
          }),
          catchError(refreshErr => {
            localStorage.removeItem('token');
            router.navigate(['/login']);
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
