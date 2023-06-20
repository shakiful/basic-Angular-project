import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable, OnInit } from '@angular/core';
import { recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredients.model';

@Injectable()
export class RecipeService implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}


  recipe: recipe;

  recipes: recipe[] = [
    new recipe(
      'Salad',
      'this is a test recipe',
      'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg',
      [new Ingredients('meat', 1), new Ingredients('french fries', 20)]
    ),
    new recipe(
      'Salad 2',
      'this is a test recipe 2',
      'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg',
      [new Ingredients('buns', 2), new Ingredients('Meat', 1)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
