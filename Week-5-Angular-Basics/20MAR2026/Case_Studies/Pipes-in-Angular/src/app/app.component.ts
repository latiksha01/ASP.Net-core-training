import {AsyncPipe, CommonModule, DatePipe, KeyValuePipe} from '@angular/common';
import { Component, signal } from "@angular/core";
import { CustomCurrencyPipe } from "./custom-currency.pipe";
import { of } from "rxjs";

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, DatePipe, KeyValuePipe, CustomCurrencyPipe,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  today = new Date();
   data$ = of([
    {
      id:1,
      productName: 'Laptop',
      price: 50000,
      status:'Delivered'
    },
    {
      id:2,
      productName: 'SmartPhone',
      price: 15000,
      status:'Pending'
    }
   ]);

   product = {
    name : 'Laptop',
    price : 50000
   };
}
