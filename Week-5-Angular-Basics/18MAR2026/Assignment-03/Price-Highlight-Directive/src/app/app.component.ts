import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceHighlightDirective } from './price-highlight.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PriceHighlightDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  products = [
    { name: 'Laptop', price: 75000 },
    { name: 'Mobile', price: 30000 },
    { name: 'TV', price: 60000 },
    { name: 'Headphones', price: 2000 }
  ];

}