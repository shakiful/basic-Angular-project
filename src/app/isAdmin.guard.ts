import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";

export class MemberAuthGuard implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }
}
