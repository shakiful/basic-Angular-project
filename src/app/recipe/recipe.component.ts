import { Component, OnInit } from '@angular/core';
import { recipe } from './recipe.model';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit{
  selectedRecipe:recipe;

  constructor() {

  }

  ngOnInit(): void {

  }

}
