import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `<h2>Home Component</h2>`
})
export class HomeComponent {
  title='Welcome to the Home Page';
}