import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
    this.subscription = this.recipesService.recipeChanged.subscribe(
      (recipes) => {
        this.recipes = recipes;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  newRecipe() {
    this.router.navigate(['/recipes', 'new']);
  }
}
