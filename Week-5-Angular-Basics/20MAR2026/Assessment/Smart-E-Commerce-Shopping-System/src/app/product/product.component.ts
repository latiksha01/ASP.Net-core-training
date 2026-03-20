
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-product',
  standalone: true,   // 🔥 VERY IMPORTANT
  imports: [CommonModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Output() cartUpdated = new EventEmitter<any[]>();  // ✅ ADD THIS

  products = [
    { id: 1, name: 'Laptop', price: 50000, category: 'Electronics', rating: 4.5, qty: 1 },
    { id: 2, name: 'Shoes', price: 2000, category: 'Fashion', rating: 4.0, qty: 1 },
    { id: 3, name: 'Phone', price: 30000, category: 'Electronics', rating: 4.7, qty: 1 }
  ];

  cartItems: any[] = [];

  addToCart(product: any) {
    const item = this.cartItems.find(p => p.id === product.id);

    if (item) {
      item.qty += product.qty;
    } else {
      this.cartItems.push({ ...product });
    }

    this.cartUpdated.emit(this.cartItems); // 🔥 IMPORTANT
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  searchText: string = '';
  selectedCategory: string = '';
}