import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ITask } from '../interfaces/task';

@Injectable()
export class CalendarService {
  currentDate: Date;
  choosenDate: Date;
  choosenWeek: Date[];

  taskArray: ITask[];
  tasksForCurrentWeek: ITask[];

  constructor(private http: HttpClient) {
    this.currentDate = new Date();
    this.choosenDate = new Date();
    this.choosenWeek = this.getChoosenWeekByDate(this.currentDate);
    this.taskArray = [];
    this.tasksForCurrentWeek=[];
  }

  getTasksForTheCurrentWeek(tasks: ITask[], week: Date[]): void {
    const tasksToReturn: ITask[] = [];
    tasks.forEach((x) => {
      week.forEach((day) => {
        const dayString = day.toDateString();
        const taskDayString = x.date.toDateString();
        if (dayString === taskDayString) {
          tasksToReturn.push(x);
        }
      });
    });
    this.tasksForCurrentWeek= tasksToReturn;
  }

  getChoosenWeekByDate(date: Date): Date[] {
    const choosenDate = new Date(date);
    const arr: Date[] = [];
    const currentWeekDay = choosenDate.getDay();
    const currentDay = choosenDate.getDate();

    // if the date isn't  monday we go on monday and then iterate
    if (currentWeekDay !== 1) {
      choosenDate.setDate(currentDay - currentWeekDay + 1);
    }

    let dateToPush = new Date(choosenDate);
    arr.push(dateToPush);
    for (let i = 0; i < 6; i++) {
      dateToPush = new Date(choosenDate.setDate(choosenDate.getDate() + 1));
      arr.push(dateToPush);
    }

    this,choosenDate.setDate(arr[0].getDate());
    return arr;
  }

  renderTheCalendarHeader(): void {
    // add the current date to calendar-header-date
    let dateElement = document.getElementById('calendar-header-date');
    if (dateElement) {
      dateElement.innerText = 'Today: ' + this.getDate(this.currentDate);
    }

    const weekDays = this.choosenWeek;

    const monthContainer = document.getElementById(
      'calendar-table-header-month'
    );
    const mondayContainer = document.getElementById(
      'calendar-table-header-monday'
    );
    const tuesdayContainer = document.getElementById(
      'calendar-table-header-tuesday'
    );
    const wednesdayContainer = document.getElementById(
      'calendar-table-header-wednesday'
    );
    const thursdayContainer = document.getElementById(
      'calendar-table-header-thursday'
    );
    const fridayContainer = document.getElementById(
      'calendar-table-header-friday'
    );
    const saturdayContainer = document.getElementById(
      'calendar-table-header-saturday'
    );
    const sundayContainer = document.getElementById(
      'calendar-table-header-sunday'
    );

    if (monthContainer)
      monthContainer.innerText = weekDays[4].toString().split(' ')[1];
    if (mondayContainer)
      mondayContainer.innerHTML = weekDays[0].getDate() + ' Mon';
    if (tuesdayContainer)
      tuesdayContainer.innerText = weekDays[1].getDate() + ' Tue';
    if (wednesdayContainer)
      wednesdayContainer.innerText = weekDays[2].getDate() + ' Wed';
    if (thursdayContainer)
      thursdayContainer.innerText = weekDays[3].getDate() + ' Thu';
    if (fridayContainer)
      fridayContainer.innerText = weekDays[4].getDate() + ' Fri';
    if (saturdayContainer)
      saturdayContainer.innerText = weekDays[5].getDate() + ' Sat';
    if (sundayContainer)
      sundayContainer.innerText = weekDays[6].getDate() + ' Sun';
  }

  // to print the dates in format "01.01.2020"
  getDate(date: Date): string {
    const currentDate = date.getDate();
    const month = date.getMonth();
    const dayToReturn = currentDate < 10 ? '0' + currentDate : currentDate;
    const monthToReturn = month + 1 < 10 ? '0' + (month + 1) : month + 1;

    return dayToReturn + '.' + monthToReturn + '.' + date.getFullYear();
  }

  renderTheTasks(): void {
    this.getTasksForTheCurrentWeek(
      this.taskArray,
      this.choosenWeek
    );
    this.tasksForCurrentWeek.forEach((x) => this.printTask(x));
  }

  // printing a task on the calendar
  printTask(task: ITask): void {
    const date = new Date(task.date);

    const weekDay = date.toDateString().split(' ')[0];

    const startingHourMinuteArr = task.from.split(':');
    const fromHour = startingHourMinuteArr[0];
    const fromMinutes = startingHourMinuteArr[1];

    const endingingHourMinuteArr = task.to.split(':');
    const toHour = endingingHourMinuteArr[0];
    const toMinutes = endingingHourMinuteArr[1];

    const numberOfRowsInAddition = this.calculateNumOfRows(
      +fromMinutes,
      +toMinutes
    );

    const numberOfRows = (+toHour - +fromHour) * 2 + numberOfRowsInAddition;

    this.printRows(task, numberOfRows, weekDay, fromHour, fromMinutes);
  }

  calculateNumOfRows(from: number, to: number): number {
    if (from >= 30 && to >= 30) {
      return 1;
    }

    if (from == 0 && to == 0) {
      return 0;
    } else {
      if (from <= 30 && to <= 30) return 1;
    }

    if (from <= 30 && to >= 30) {
      return 2;
    }

    if (from >= 30 && to <= 30) {
      return 0;
    }

    return 0;
  }

  printRows(
    task: ITask,
    num: number,
    day: string,
    hourString: string,
    minutesString: string
  ) {
    const taskHour = hourString;
    const taskMinutes = minutesString;

    let element;
    let minutes = +minutesString;
    let hour = +hourString;

    if (minutes < 30) {
      element = document.getElementById(`${day}-${hour}`);
      if (element) {
        element.innerText = task.title;
        element.className = 'task';
        element.title = `${task.title}/${day}/${taskHour}:${taskMinutes}`;
        minutes = 30;
      }
    } else {
      element = document.getElementById(`${day}-${hour}-30`);
      if (element) {
        element.innerText = task.title;
        element.className = 'task';
        element.title = `${task.title}/${day}/${taskHour}:${taskMinutes}`;
        minutes = 0;
        hour++;
      }
    }

    while (--num > 0) {
      if (minutes < 30) {
        element = document.getElementById(`${day}-${hour}`);
        if (element) {
          element.className = 'task';
          element.title = `${task.title}/${day}/${taskHour}:${taskMinutes}`;
          minutes = 30;
          if (num == 1) element.style.borderBottom = '1px solid white';
        }
      } else {
        element = document.getElementById(`${day}-${hour}-30`);
        if (element) {
          element.className = 'task';
          element.title = `${task.title}/${day}/${taskHour}:${taskMinutes}`;
          minutes = 0;
          hour++;
          if (num == 1) element.style.borderBottom = '1px solid white';
        }
      }
    }
  }

  cleanTheView() {
    this.getTasksForTheCurrentWeek(
      this.taskArray,
      this.choosenWeek
    );
    this.tasksForCurrentWeek.forEach((x) => this.clearTask(x));
  }

  clearTask(task: ITask) {
    const weekDay = task.date.toDateString().split(' ')[0];

    const startingHourMinuteArr = task.from.split(':');
    const fromHour = +startingHourMinuteArr[0];
    const fromMinutes = +startingHourMinuteArr[1];

    const endingingHourMinuteArr = task.to.split(':');
    const toHour = +endingingHourMinuteArr[0];
    const toMinutes = +endingingHourMinuteArr[1];

    const numberOfRowsInAddition = this.calculateNumOfRows(
      +fromMinutes,
      +toMinutes
    );

    const numberOfRows = (+toHour - +fromHour) * 2 + numberOfRowsInAddition;

    this.cleanRows(numberOfRows, weekDay, fromHour, fromMinutes);
  }

  cleanRows(num: number, day: string, hour: number, minutes: number) {
    let element;

    if (minutes < 30) {
      element = document.getElementById(`${day}-${hour}`);

      if (element) {
        element.innerText = '';
        element.className = '';
        element.title = '';
        minutes = 30;
      }
    } else {
      element = document.getElementById(`${day}-${hour}-30`);

      if (element) {
        element.innerText = '';
        element.className = '';
        element.title = '';
        minutes = 0;
        hour++;
      }
    }

    while (--num > 0) {
      if (minutes < 30) {
        element = document.getElementById(`${day}-${hour}`);
        if (element) {
          element.className = '';
          element.title = '';
          if (num == 1) element.style.borderBottom = '';
          minutes = 30;
        }
      } else {
        element = document.getElementById(`${day}-${hour}-30`);
        if (element) {
          element.className = '';
          element.title = '';
          if (num == 1) element.style.borderBottom = '';
          minutes = 0;
          hour++;
        }
      }
    }
  }

  prevWeek() {
    this.cleanTheView();
    this.choosenDate.setDate(this.choosenDate.getDate() - 7);
    this.choosenWeek = this.getChoosenWeekByDate(this.choosenDate);
    this.getTasksForTheCurrentWeek(
      this.taskArray,
      this.choosenWeek
    );
    this.renderTheCalendarHeader();
    this.renderTheTasks();
  }

  nextWeek() {
    this.cleanTheView();
    this.choosenDate.setDate(this.choosenDate.getDate() + 7);
    this.choosenWeek = this.getChoosenWeekByDate(this.choosenDate);
    this.getTasksForTheCurrentWeek(
      this.taskArray,
      this.choosenWeek
    );
    this.renderTheCalendarHeader();
    this.renderTheTasks();
  }

  postTask(obj: NgForm): void {
    const description = '';
    const newItem: ITask = { ...obj.value, description };
    this.http
      .post('/task', newItem, {
        withCredentials: true,
      })
      .subscribe();
    console.log('from cal ser');
    const date=new Date(newItem.date);
    newItem.date=date;
    this.taskArray.push(newItem);
    this.renderTheTasks();
  }

  getTasks():Observable<any>{
    return this.http.get('/task',{withCredentials:true})
    .pipe(tap((results) => {
      const newTaskArr = results as ITask[];
      newTaskArr.forEach((x)=>{
        const date=new Date(x.date);
        x.date=date;
      })
      this.taskArray = newTaskArr;
    }))
  }

  emptyArrays():void{
    this.taskArray=[];
    this.tasksForCurrentWeek=[];
  }

  findTaskByTitle(title:String){
    const infoArr=title.split('/');
    const selectedTask=this.tasksForCurrentWeek.find(x=>  x.title===infoArr[0] && x.from===infoArr[2]);

    return selectedTask;
  }

  editTask(task:any){
    return this.http.patch(`/task/${task._id}`,task,{withCredentials:true}).subscribe();
  }
}
