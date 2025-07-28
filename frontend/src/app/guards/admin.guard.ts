// src/app/guards/admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const usuario = authService.getUsuarioActual();

  if (usuario && usuario.rol === 'administrador') {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};
