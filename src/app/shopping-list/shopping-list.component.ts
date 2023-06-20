import { Subscription } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientsList: Ingredients[];

  private subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.ingredientsList = this.shoppingListService.getIngredients();
    console.log(this.ingredientsList);
    this.subscription = this.shoppingListService.ingredientAdded.subscribe(
      (ingredients: Ingredients[]) => {
        this.ingredientsList = ingredients;
      }
    );
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }
}
