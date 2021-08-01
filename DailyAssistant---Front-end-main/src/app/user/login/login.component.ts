import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userService: UserService;
  errorMessage = '';
  haveError=false;

  constructor(userService: UserService, private router: Router) {
    this.userService = userService;
  }

  ngOnInit(): void {}

  submitLogin(obj: NgForm): void {
    const email = obj.value.email;
    const password = obj.value.password;

    this.userService.postLogin({ email, password }).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (e) => {
        this.errorMessage = 'The provided password does not matched.';
        this.haveError=true;
      },
    });
  }
}
