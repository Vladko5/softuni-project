import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  calendarService: CalendarService;
  addIsClicked: boolean;
  forEdition:boolean;

  constructor(calendarService: CalendarService) {
    this.addIsClicked = false;
    this.forEdition=false;
    this.calendarService = calendarService;
  }

  ngOnInit(): void {
    this.calendarService.getTasks().subscribe();
    this.calendarService.renderTheCalendarHeader();
    setTimeout(() => {
      this.calendarService.renderTheTasks();
    }, 0);

    const scroll = document.getElementById('calendar-table-div');
    if (scroll) scroll.scrollTop = 450;
  }
  ngAfterViewInit(): void {}

  addClicked(): void {
    this.addIsClicked = !this.addIsClicked;
    if(this.forEdition)this.forEdition=false;
  }
  submmitTask(obj: NgForm): void {
    this.calendarService.postTask(obj);
    this.addClicked();
    obj.resetForm();
  }

  clickedTask(event: MouseEvent): void {
    const targetEl: HTMLElement = event.target as HTMLElement;
    if (targetEl.className == 'task') {
      console.log(event.target);

      const task = this.calendarService.findTaskByTitle(targetEl.title);
      console.log(task);

      this.forEdition=!this.forEdition;
      this.addIsClicked = !this.addIsClicked;

      setTimeout(() => {
        const title:HTMLInputElement = document.getElementById('title') as HTMLInputElement;
        const date: HTMLInputElement = document.getElementById('date') as HTMLInputElement;
        const from: HTMLInputElement = document.getElementById('from') as HTMLInputElement;
        const to: HTMLInputElement = document.getElementById('to') as HTMLInputElement;
        if (title && task) title.value = task.title;
        if (date && task) date.value = task.date.toISOString().substring(0, 10);
        if (from && task) from.value = task.from;
        if (to && task) to.value = task.to;

        document.getElementById('editBtn')?.addEventListener('click',()=>{
          if(task){
            task.title=title.value;
            task.date=new Date(date.value);
            task.from=from.value;
            task.to=to.value;

            this.calendarService.editTask(task);
          }
        })

      }, 0);
    }
  }
}
