import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './products.component.html',
  imports: [CommonModule],
  styleUrl: './products.component.css',
})
export class ProductsComponent {

  products = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Mobile', price: 20000 },
    { id: 3, name: 'Headphones', price: 2000 }
  ];

}