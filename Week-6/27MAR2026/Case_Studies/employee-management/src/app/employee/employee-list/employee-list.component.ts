import { Component } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  template: `
  <h2>Employee List</h2>
  <ul>
    <li *ngFor="let employee of employees">{{ employee.name }} - {{ employee.role }}</li>
  </ul>
  <p *ngIf="employees.length === 0">No employees available.</p>
  `
})
export class EmployeeListComponent {
  employees: any[] = [];

  constructor(private service: EmployeeService) { 
    this.employees = service.getEmployees();
  }
}
