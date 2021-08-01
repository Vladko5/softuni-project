import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { LinksComponent } from './link/links/links.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component:HomeComponent
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path:'calendar',
    component:CalendarComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'budget',
    loadChildren:()=>import('./budgeting/budgeting.module').then(m=>m.BudgetingModule),
  },
  {
    path:'links',
    component:LinksComponent,
    canActivate:[AuthGuard]
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
