import { RouterModule, Routes } from "@angular/router";

import { NotAuthGuard } from "../not-auth.guard";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes:Routes=[

  {
    path:'login',
    component:LoginComponent,
    // canActivate:[NotAuthGuard]
  },
  {
    path:'register',
    component:RegisterComponent,
    // canActivate:[NotAuthGuard]
  },
]

export const UserRoutingModule=RouterModule.forChild(routes);
