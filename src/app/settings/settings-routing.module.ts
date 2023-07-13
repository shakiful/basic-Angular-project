import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { authGuardFn } from '../auth/auth-guard';
import { PermissionGuardFn } from '../header/permission-guard';

const route: Routes = [
  { path: '', component: SettingsComponent, canActivate: [authGuardFn,PermissionGuardFn] },
];
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
