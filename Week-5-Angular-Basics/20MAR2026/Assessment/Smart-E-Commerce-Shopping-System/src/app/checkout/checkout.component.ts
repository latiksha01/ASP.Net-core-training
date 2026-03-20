import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  user = {
    name: '',
    address: '',
    email: '',
    phone: '',
    zip: '',
    gender: '',
    deliveryType: '',
    terms: false,
    subscribe: false,
    city: '',
    state: '',
    country: '',
    deliveryDate: '',
    instructions: '',
    paymentMethod: '',
    cardNumber: '',
    cvv: '',
    upi: ''
  };

}