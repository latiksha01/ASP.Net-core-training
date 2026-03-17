import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pizza-app',
  imports: [FormsModule],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.css'
})
export class PizzaComponent {
  pizzaName: string ='';
  quantity: number = 1;
  address: string='';
}
