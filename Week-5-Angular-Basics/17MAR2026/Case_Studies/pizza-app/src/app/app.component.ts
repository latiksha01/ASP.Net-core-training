import { Component } from '@angular/core';
import { PizzaComponent } from './pizza/pizza.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PizzaComponent],
  template: '<pizza-app></pizza-app>',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title = 'pizza-app';
}