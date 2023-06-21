import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { recipe } from './recipe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): recipe[] | Observable<recipe[]> | Promise<recipe[]> {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
