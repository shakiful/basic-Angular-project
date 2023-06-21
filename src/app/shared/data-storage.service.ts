import { Injectable } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { recipe } from '../recipe/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private recipeService: RecipeService, private http: HttpClient) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put(
        'https://ng-course-recipe-book-bead3-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((recipes) => {
        console.log(recipes);
      });
  }

  fetchRecipes() {
    return this.http
      .get<recipe[]>(
        'https://ng-course-recipe-book-bead3-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      )

  }
}
