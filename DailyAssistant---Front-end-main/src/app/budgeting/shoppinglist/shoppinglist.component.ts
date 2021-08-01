import { Component, Input, OnInit } from '@angular/core';
import { BudgetingService } from '../budgeting.service';
import { IShoppingItem } from '../../interfaces/shoppingItem';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {

  @Input() item!: IShoppingItem;

  isClicked: boolean;

  constructor(private budgetService:BudgetingService) {
    this.isClicked = false;
  }

  ngOnInit(): void {

  }

  changeValue() {
    console.log(this.isClicked);

    setTimeout(() => {
      this.isClicked = !this.isClicked;
    }, 500)

    this.budgetService.deleteShoppingItem(this.item._id);
  }
}