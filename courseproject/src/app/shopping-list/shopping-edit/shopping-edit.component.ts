import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list.actions';
import { AppState, State } from '../shopping-list.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm: NgForm;
  constructor(
    private store: Store<AppState>
  ) {}
  editingSubscription: Subscription;
  editMode = false;

  ngOnInit(): void {
    this.editingSubscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.setValuesForEditing(stateData.editedIngredient);
        } else {
          this.editMode = false;
        }
      });
  }

  setValuesForEditing(ingredient: Ingredient) {
    this.shoppingForm.setValue({
      name: ingredient.name,
      amount: ingredient.amount,
    });
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.EndEdit());
  }

  clearForm() {
    this.shoppingForm.reset({
      name: '',
      amount: 1,
    });

    this.store.dispatch(new ShoppingListActions.EndEdit());
    this.editMode = false;
  }

  upgradeIngredients(ingredient: Ingredient) {
    this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
  }

  onDeleteIngredient() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.clearForm();
  }

  onFormSubmit() {
    let ingredient: Ingredient = new Ingredient(
      this.shoppingForm.value.name,
      this.shoppingForm.value.amount
    );
    if (this.editMode == false) {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    } else {
      this.upgradeIngredients(ingredient);
    }

    this.clearForm();
  }
}
