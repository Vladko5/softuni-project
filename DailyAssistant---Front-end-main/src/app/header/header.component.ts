import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  get isLogged(): boolean {
    return this.userService.isLogged;
  }
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  logoutHandler(): void {
    this.userService.getlogout().subscribe(() => {
      this.router.navigate(['/login'])}
      );
  }
}