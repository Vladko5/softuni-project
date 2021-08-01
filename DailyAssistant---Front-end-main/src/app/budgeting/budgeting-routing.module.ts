import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";

import { BudgetingComponent } from "./budgeting/budgeting.component";

const routes:Routes=[

  {
    path:'budget',
    component:BudgetingComponent,
    canActivate:[AuthGuard]
  }
]

export const BudgetRoutingModule=RouterModule.forChild(routes);