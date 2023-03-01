import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingRoutesModule } from './shopping-routes.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [FormsModule, ShoppingRoutesModule, SharedModule],
})
export class ShoppingListModule {}
