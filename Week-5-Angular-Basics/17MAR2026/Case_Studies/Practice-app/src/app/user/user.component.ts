import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
title() {
throw new Error('Method not implemented.');
}
  users = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
  ];
  user = {
    name: 'Alice', age : 30};
    getGreeting() {
      return 'Welcome, ' + this.user.name ;
}
}