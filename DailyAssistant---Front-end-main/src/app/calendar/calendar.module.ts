import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from './calendar.service';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[
    CalendarService
  ]
})
export class CalendarModule { }