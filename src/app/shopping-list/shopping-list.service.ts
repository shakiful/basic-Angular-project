import { Ingredients } from './../shared/ingredients.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  startedEditing = new Subject<number>();
  ingredientAdded = new Subject<Ingredients[]>();

  ingredients: Ingredients[] = [
    new Ingredients('apples', 5),
    new Ingredients('oranges', 10),
    new Ingredients('pears', 15),
    new Ingredients('grapes', 20),
  ];

  onIngredientAdded(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredients) {
    this.ingredients[index] = newIngredient;
    this.ingredientAdded.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredients[]) {
    ingredients.forEach((ingredient) => {
      const existingIngredient = this.ingredients.find(
        (ingredients) => ingredients.name === ingredient.name
      );
      if (existingIngredient) {
        // If the ingredient already exists, update its quantity instead of adding a new one.
        existingIngredient.amount += ingredient.amount;
      } else {
        // If the ingredient does not exist, add it to the list.
        this.ingredients.push(ingredient);
      }
    });
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
