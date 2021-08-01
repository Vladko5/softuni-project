import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CalendarService } from '../calendar/calendar.service';
import { BudgetingService } from '../budgeting/budgeting.service';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  isLoggedIn: boolean = false;
  http: HttpClient;
  currentUser:any;

  get isLogged(): boolean { return !!this.currentUser; }

  constructor(http: HttpClient,
    private calendarService:CalendarService,
    private budgetingService:BudgetingService) {
    this.http = http;
  }

  postLogin(data:any): Observable<any> {
    // console.log('LogSubm');
    // console.log({ ...obj.value });

    return this.http.post('/login', data,{ withCredentials: true }).pipe(
      tap((res) => {
        this.currentUser=res;
      })
    );
  }
  postRegister(obj: NgForm):Observable<any> {

    const email = obj.value.email;
    const password = obj.value.password;

   return this.http
      .post('/register', { email, password })
      .pipe();
  }
  getlogout():Observable<any>{

    this.calendarService.emptyArrays();
    this.budgetingService.emptyArrays();

    return this.http.get(`/logout`, { withCredentials: true }).pipe(
      tap(() => this.currentUser = null)
    );


  }
}
