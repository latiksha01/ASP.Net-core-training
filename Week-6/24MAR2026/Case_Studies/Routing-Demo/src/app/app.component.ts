import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink, CommonModule],
  template: `
  <h1>Angular Routing Demo</h1>
  <nav>
    <a routerLink="/home">Home</a>
    <br>
    <a routerLink="/contact">Contact</a>
    <br>
    <a routerLink="/product">Product</a>
  </nav>

  <hr>

  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Routing-Demo';
}
