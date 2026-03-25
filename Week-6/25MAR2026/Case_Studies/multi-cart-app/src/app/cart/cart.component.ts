import { Component } from '@angular/core';
import { CartService, Product } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private cartService: CartService) {}

  getCartItems(): Product[] {
    return this.cartService.getItems();
  }

  getTotal(): number {
    return this.getCartItems().reduce((sum, item) => sum + item.price, 0);
  }
}