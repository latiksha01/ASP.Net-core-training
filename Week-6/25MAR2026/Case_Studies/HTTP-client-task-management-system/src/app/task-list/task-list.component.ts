import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  editingTaskId: number | null = null;
  editedTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data.slice(0, 10); // limit
    });
  }

  // Toggle complete
  toggleTask(task: Task) {
    task.completed = !task.completed;
  }

  // Delete (frontend only)
  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  // Start edit
  startEdit(task: Task) {
    this.editingTaskId = task.id!;
    this.editedTitle = task.title;
  }

  // Save edit
  saveEdit(task: Task) {
    task.title = this.editedTitle;
    this.editingTaskId = null;
  }

  // Add task from form
  addLocalTask(task: Task) {
    this.tasks.unshift({
      ...task,
      id: Date.now()
    });
  }
}
