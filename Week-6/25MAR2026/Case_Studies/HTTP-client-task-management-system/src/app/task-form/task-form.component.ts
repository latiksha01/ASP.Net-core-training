import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {

  newTask: Task = {
    title: '',
    completed: false
  };

  @Output() taskAdded = new EventEmitter<Task>();

  addTask() {
    if (this.newTask.title.trim()) {
      this.taskAdded.emit(this.newTask);

      this.newTask = { title: '', completed: false };
    }
  }
}
