import { Component } from '@angular/core';
import { RxjsComponent } from './rxjs/rxjs.component';

@Component({
  selector: 'app-root',
  imports: [RxjsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Rxjs-Demo';
}
