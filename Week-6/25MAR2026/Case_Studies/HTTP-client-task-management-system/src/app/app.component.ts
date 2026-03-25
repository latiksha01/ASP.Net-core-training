import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, TaskFormComponent],
  template: `
    <app-task-form (taskAdded)="taskList.addLocalTask($event)"></app-task-form>
    <app-task-list #taskList></app-task-list>
  `
})
export class AppComponent {}
