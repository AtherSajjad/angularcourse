import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
// initial state, when state is null
const initialState: State = {
  ingredients: [new Ingredient('Tomatoes', 10), new Ingredient('Potatoes', 5)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          (<ShoppingListActions.AddIngredient>action).payload,
        ],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      // https://stackoverflow.com/questions/50234481/typescript-2-8-3-type-must-have-a-symbol-iterator-method-that-returns-an-iterato
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...(<ShoppingListActions.AddIngredients>action).payload,
        ],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      let actionData = <ShoppingListActions.UpdateIngredient>action;

      let ingredient = state[state.editedIngredientIndex];

      let newIngredient = {
        ...ingredient,
        ...actionData.payload,
      };

      let newIngredients = [...state.ingredients];
      newIngredients[state.editedIngredientIndex] = newIngredient;

      return {
        ...state,
        ingredients: newIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (_, index) => index !== state.editedIngredientIndex
        ),
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    case ShoppingListActions.START_EDIT:
      let startData = <ShoppingListActions.StartEdit>action;
      return {
        ...state,
        editedIngredientIndex: startData.payload,
        editedIngredient: state.ingredients[startData.payload],
      };
    case ShoppingListActions.END_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    default:
      return state;
  }
}
