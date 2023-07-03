import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable, OnInit } from '@angular/core';
import { recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  recipeChanged = new Subject<recipe[]>();
  recipe: recipe;

  // recipes: recipe[] = [
  //   new recipe(
  //     'Salad',
  //     'this is a test recipe',
  //     'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg',
  //     [new Ingredients('meat', 1), new Ingredients('french fries', 20)]
  //   ),
  //   new recipe(
  //     'Salad 2',
  //     'this is a test recipe 2',
  //     'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg',
  //     [new Ingredients('buns', 2), new Ingredients('Meat', 1)]
  //   ),
  // ];

  private recipes: recipe[] = [];

  setRecipes(recipes: recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: recipe) {
    console.log(this.recipes.push(recipe), 'add');
    // this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: recipe) {
    this.recipes[index] = newRecipe;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
