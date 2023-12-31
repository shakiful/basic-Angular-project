import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { MemberAuthGuard } from './isAdmin.guard';
import { PlatinumMemberAuthGuard } from './isPlatinumMember.guard';
import { SuperAdminGuard } from './isSuper.guard';

const routes: Routes = [
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
  {
    path: 'recipe',
    component: RecipeComponent,
    // canActivate: [MemberAuthGuard, PlatinumMemberAuthGuard],
    // canActivateChild: [SuperAdminGuard],
    // canDeactivate: [() => true],
    children: [
      {
        path: '',
        component: RecipeStartComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
      },

      {
        path: ':id/edit',
        component: RecipeEditComponent,
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'not-found', component: ShoppingListComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
