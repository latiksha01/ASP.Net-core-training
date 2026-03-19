import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './highlight.directive';
import { StatusColorDirective } from './status-color.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HighlightDirective, StatusColorDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  students = [
    { name: 'Aman', marks: 92 },
    { name: 'Riya', marks: 75 },
    { name: 'Karan', marks: 45 },
    { name: 'Neha', marks: 60 },
    { name: 'Rahul', marks: 30 }
  ];

}