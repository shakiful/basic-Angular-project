import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable, map, take } from 'rxjs';

export const PermissionGuardFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.user.pipe(
    map((user) => {
      if (user && user.role.toString() === 'viewer') {
        return router.createUrlTree(['/recipe']);
      }
      return true;
    })
  );
};
