import { EventEmitter, Output } from '@angular/core';
import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { BudgetingService } from '../budgeting.service';
import { IBudget } from '../../interfaces/budget';

@Component({
  selector: 'app-budgetlist',
  templateUrl: './budgetlist.component.html',
  styleUrls: ['./budgetlist.component.css'],
})
export class BudgetlistComponent implements OnInit, OnDestroy {
  isDeleted: boolean;
  @Input() record!: IBudget;

  @Output() deleteBtn: EventEmitter<IBudget> = new EventEmitter();
  budgetService: BudgetingService;

  constructor(budgetService: BudgetingService) {
    this.isDeleted = false;
    this.budgetService = budgetService;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  deleteEl(id: string): void {
    this.isDeleted = true;
    this.deleteBtn.emit();

    this.budgetService.deleteBudgetItem(id);

    const recordIndex = this.budgetService.budgetArray.findIndex(
      (x) => x == this.record
    );
    this.budgetService.budgetArray.splice(recordIndex, 1);
  }
}
