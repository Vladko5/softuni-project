import { ElementRef, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { IBudget } from '../interfaces/budget';
import { IShoppingItem } from '../interfaces/shoppingItem';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class BudgetingService {
  budgetArray: IBudget[];
  shoppingArray: IShoppingItem[];

  constructor(private http: HttpClient) {
    this.budgetArray = [];
    this.shoppingArray = [];
  }
  spendForTheMonth():Number{
    let spend=0;
    this.budgetArray.forEach((x)=>{
      spend+=Number(x.price);
    })

    return spend;
  }

  /**
   *
   * Budgeting handlers
   *
   */

  getBudgetArray(): Observable<any> {
    return this.http
      .get('/budgets', { withCredentials: true })
      .pipe(
        tap((results) => {
          const newBudgArr = results as IBudget[];

          newBudgArr.forEach((x) => {
            const stringDate = x.date;
            x.date = new Date(stringDate);
          });

          this.budgetArray = newBudgArr;
        })
      );
  }

  postBudgetItem(obj: NgForm): void {
    const date=new Date();
    const newList: IBudget = { ...obj.value, date, isDone: false };
    this.http
      .post('/budgets', newList, {
        withCredentials: true,
      })
      .subscribe();
    this.budgetArray.push(newList);
    obj.resetForm();
  }

  deleteBudgetItem(id: string) {
    this.http
      .delete(`/budgets/${id}`, {
        withCredentials: true,
      })
      .subscribe();
  }

  /**
   *
   * Shopping handlers
   *
   */

  getShoppingArray(): Observable<any> {

    return this.http
      .get('/shopping', { withCredentials: true })
      .pipe(
        tap((results) => {
          const newShopArr = results as IShoppingItem[];

          this.shoppingArray = newShopArr;
        })
      );
  }

  postShoppingItem(obj: NgForm): void {
    console.log("from postShopping");
    const newItem: IShoppingItem = { ...obj.value, isDone:false };
    this.http
      .post('/shopping', newItem, {
        withCredentials: true,
      })
      .subscribe();
    this.shoppingArray.push(newItem);
    obj.resetForm();
  }

  deleteShoppingItem(id: string) {
    this.http
      .delete(`/shopping/${id}`, {
        withCredentials: true,
      })
      .subscribe();
  }

  emptyArrays():void{
    this.budgetArray=[];
    this.shoppingArray=[];
  }
}