import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipesService {

  recipeChanged = new Subject<Recipe[]>();

  constructor(private shoppingService: ShoppingService) {}

  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Chicken Tikka Masala',
  //     'Delicious chicken dish made from curry',
  //     'https://assets.bonappetit.com/photos/5b69f163d3d14670539a2174/1:1/w_2240,c_limit/ba-tikka-masala-2.jpg',
  //     [new Ingredient('Meat', 10), new Ingredient('Loaf', 20)]
  //   ),
  //   new Recipe(
  //     'Butter Chicken Masala',
  //     'Delicious chicken dish made from curry',
  //     'https://assets.bonappetit.com/photos/5b69f163d3d14670539a2174/1:1/w_2240,c_limit/ba-tikka-masala-2.jpg',
  //     [new Ingredient('Butter masala', 1), new Ingredient('Butter Milk', 20)]
  //   ),
  // ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addRecipesIngredientsToShoppingList(recipe: Recipe) {
    this.shoppingService.addIngredients(recipe.ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
