import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService : ProductService,
    private cartService : CartService

  ){}
  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  addToCart(product: any)
  {
    this.cartService.addTOCart(product);
  }

}
