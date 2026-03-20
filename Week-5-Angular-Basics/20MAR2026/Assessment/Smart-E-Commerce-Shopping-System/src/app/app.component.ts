import { Component } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductComponent, CartComponent, CheckoutComponent],  // ✅ ADD ALL
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}