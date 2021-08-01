import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate():boolean{
    if(this.userService.isLogged){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  isNotAuth():boolean{
    if(this.userService.isLogged){
      this.router.navigate(['/']);
      return false;
    }
    else{
      return true;
    }
  }

}
