import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products = [
    { id:1, name: 'Laptop', price: 1000 },
    { id:2, name: 'Mobile', price: 500 },
    { id:3, name: 'Tablet', price: 800 }
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  getCartItems() {
    return this.cartService.getItems();
  }
}
