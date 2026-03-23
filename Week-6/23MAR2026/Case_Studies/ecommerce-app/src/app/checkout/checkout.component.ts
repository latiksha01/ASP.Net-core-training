import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  form = {
    name: '',
    email: '',
    address: '',
    payment: ''
  };

  submit() {
    alert('ORDER PLACED SUCCESSFULLY');
    console.log(this.form);
  }
}
