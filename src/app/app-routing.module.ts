import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
  { path: 'recipe', loadChildren:() => import('./recipe/recipe.module').then(m => m.RecipeModule) },
  { path: 'shopping-list', loadChildren:() => import('./shopping-list/shopping.module').then(m => m.ShoppingModule) },
  { path: 'auth', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'settings', loadChildren:() => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'weather', loadChildren:() => import('./weather/weather.module').then(m => m.WeatherModule) },


  // { path: 'not-found', component: ShoppingListComponent },
  // { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
