import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(): Product[] {
    return [
      { id: 1, name: 'Laptop', category: 'Electronics', price: 850.50, stock: 10 },
      { id: 2, name: 'Smartphone', category: 'Electronics', price: 699.99, stock: 25 },
      { id: 3, name: 'Headphones', category: 'Electronics', price: 149.95, stock: 0 },
      { id: 4, name: 'Running Shoes', category: 'Sports', price: 89.99, stock: 15 },
      { id: 5, name: 'Yoga Mat', category: 'Sports', price: 34.50, stock: 0 },
      { id: 6, name: 'Dumbbell Set', category: 'Sports', price: 120.00, stock: 8 },
      { id: 7, name: 'Coffee Table', category: 'Furniture', price: 299.00, stock: 4 },
      { id: 8, name: 'Bookshelf', category: 'Furniture', price: 189.99, stock: 0 },
      { id: 9, name: 'Desk Chair', category: 'Furniture', price: 450.00, stock: 6 },
      { id: 10, name: 'Novel: The Last Code', category: 'Books', price: 18.99, stock: 50 },
      { id: 11, name: 'JavaScript Mastery', category: 'Books', price: 42.00, stock: 30 },
      { id: 12, name: 'Design Patterns', category: 'Books', price: 55.75, stock: 0 },
    ];
  }
}