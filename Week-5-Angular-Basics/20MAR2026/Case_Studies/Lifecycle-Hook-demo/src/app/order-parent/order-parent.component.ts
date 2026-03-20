import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderChildComponent } from '../order-child/order-child.component';

@Component({
  selector: 'app-order-parent',
  imports: [CommonModule, OrderChildComponent ],
  templateUrl: './order-parent.component.html',
  styleUrl: './order-parent.component.css'
})
export class OrderParentComponent {

   order = {
    id: 1,
    productName: 'Laptop',
    status: 'Pending',
    price: 50000,
  };

  updateStatus() {
    this.order={
      ...this.order,
      status:this.order.status === 'Pending' ? 'Delivered' : 'Pending'
    }
  }

  destroyChild = true;

  toggleChild() {
    this.destroyChild = !this.destroyChild;
  }

}
