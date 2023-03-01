import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm: NgForm;
  constructor(private shoppingService: ShoppingService) {}
  editingSubscription: Subscription;
  editMode = false;
  editingId: number = -1;

  ngOnInit(): void {
    this.editingSubscription = this.shoppingService.startedEditing.subscribe(
      (editingId: number) => {
        this.editingId = editingId;
        this.editMode = true;
        this.setValuesForEditing();
      }
    );
  }

  setValuesForEditing() {
    let ingredient: Ingredient =
      this.shoppingService.getIngredients()[this.editingId];

    this.shoppingForm.setValue({
      name: ingredient.name,
      amount: ingredient.amount,
    });
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe();
  }

  clearForm() {
    this.shoppingForm.reset({
      name: '',
      amount: 1,
    });
    this.editingId = -1;
    this.editMode = false;
  }

  addIngredients(name: string, amount: number) {
    this.shoppingService.addIngredient({
      name: name,
      amount: amount,
    });
  }

  upgradeIngredients(name: string, amount: number) {
    this.shoppingService.updateIngredient(this.editingId, {
      name: name,
      amount: amount,
    });
  }

  onDeleteIngredient() {
    this.shoppingService.deleteIngredient(this.editingId);
    this.clearForm();
  }

  onFormSubmit() {
    if (this.editMode == false) {
      this.addIngredients(
        this.shoppingForm.value.name,
        this.shoppingForm.value.amount
      );
    } else {
      this.upgradeIngredients(
        this.shoppingForm.value.name,
        this.shoppingForm.value.amount
      );
    }

    this.clearForm();
  }
}
