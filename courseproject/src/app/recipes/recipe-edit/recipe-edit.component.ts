import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] !== null && !Number.isNaN(+params['id']);
      this.initForm();
    });

    this.initForm();
  }

  initForm() {
    let recipeName = '';
    let image = '';
    let description = '';
    let ingredients = new FormArray([]);
    if (this.editMode) {
      let recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      image = recipe.image;
      description = recipe.description;

      for (let ingredient of recipe.ingredients) {
        ingredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          })
        );
      }
      //ingredients = recipe.ingredients;
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      image: new FormControl(image, [Validators.required]),
      description: new FormControl(description, Validators.required),
      ingredients: ingredients,
    });
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl(1, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.activatedRoute});
  }

  getIngredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  removeIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    // let recipe: Recipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['image'],
    //   this.recipeForm.value['ingredients']
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
  }
}
