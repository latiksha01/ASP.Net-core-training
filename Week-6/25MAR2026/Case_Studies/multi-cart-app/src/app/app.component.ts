import { Component } from '@angular/core';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsComponent, CartComponent],
  template: `
    <app-products></app-products>

    <hr>

    <app-cart></app-cart>
  `
})
export class AppComponent {}