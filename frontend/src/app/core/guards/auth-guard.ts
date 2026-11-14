import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const { data, error } = await authService.getSession();

  if (!error && data.session) {
    return true;
  }

  return router.createUrlTree(['/auth']);
};