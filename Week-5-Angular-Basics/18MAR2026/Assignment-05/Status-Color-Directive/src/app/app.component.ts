import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusColorDirective } from './status-color.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StatusColorDirective],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  students = [
    { name: 'Aman', marks: 80 },
    { name: 'Riya', marks: 45 },
    { name: 'Karan', marks: 60 },
    { name: 'Neha', marks: 30 }
  ];

}