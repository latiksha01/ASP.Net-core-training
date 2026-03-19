import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  productName = 'Laptop';
  price = 50000;
  quantity = 1;
  isAvailable = true;

  imageURL = 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/13-laptop-platinum-right-render-fy25:VP4-1260x795?fmt=png-alpha';

  customerName = '';
  address = '';

  decreaseQty(){
    if(this.quantity > 1) this.quantity--;
  }

  increaseQty(){
    this.quantity++;
  }

  toggleAvailability(){
    this.isAvailable = !this.isAvailable
  }

  getTotal(){
    return this.price * this.quantity;
  }

}
