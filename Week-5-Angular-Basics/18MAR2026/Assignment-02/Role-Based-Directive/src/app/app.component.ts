import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from './role.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RoleDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userRole = '';

  setRole(role: string) {
    this.userRole = role;
  }

}