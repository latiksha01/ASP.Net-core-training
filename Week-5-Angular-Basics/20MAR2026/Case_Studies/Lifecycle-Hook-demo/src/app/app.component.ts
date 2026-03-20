import { Component, signal } from '@angular/core';
import { OrderParentComponent } from "./order-parent/order-parent.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ OrderParentComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Lifecycle-Hook-demo';
}

