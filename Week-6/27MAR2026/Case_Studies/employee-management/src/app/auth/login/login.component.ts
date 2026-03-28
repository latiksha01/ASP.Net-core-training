import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <h2>Login</h2>
    <input [(ngModel)] = "username" placeholder="username">
    <input [(ngModel)] = "password" placeholder="password" type="password">
    <button (click)="login()">Login</button>
    `
})
export class Login {

  username = '';
  password = '';
  constructor(private auth: AuthService, private router: Router) {}
  login() {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/employees']);
    }
    else {
      alert('Invalid credentials');
    }
  }
}
