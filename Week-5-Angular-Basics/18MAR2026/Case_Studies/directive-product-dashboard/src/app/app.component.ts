import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  showProducts = true;

  products = [
    { name: 'Laptop', price: 50000, status : 'Available'},
    { name: 'Mobile', price: 15000, status : 'Out'},
    { name: 'Tablet', price: 25000, status : 'Limited'}
  ];
}
