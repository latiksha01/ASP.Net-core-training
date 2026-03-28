import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  template : `
  <nav>
    <a routerLink="/employee">Employees</a>
    <a routerLink="/login">Login</a>
  </nav>
  `
})
export class NavbarComponent {

}
