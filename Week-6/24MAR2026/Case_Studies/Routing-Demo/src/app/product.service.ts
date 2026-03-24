import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts(): Product[] {
    return [
      new Product(1, 'Laptop', 999.999),
      new Product(2, 'SmartPhone', 499.999),
      new Product(3, 'HeadPhone', 99.99),
    ];
  }

  getProductById(id: number) : Product | undefined {
    return this.getProducts().find(p => p.productID === id);
  }

  }
