import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetingComponent } from './budgeting/budgeting.component';
import { BudgetingService } from './budgeting.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BudgetlistComponent } from './budgetlist/budgetlist.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { BudgetRoutingModule } from './budgeting-routing.module';

@NgModule({
  declarations: [
    BudgetingComponent,
    BudgetlistComponent,
    ShoppinglistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BudgetRoutingModule
  ],
  providers:[
     BudgetingService
  ]
})
export class BudgetingModule { }