import { Component } from '@angular/core';

@Component({
  selector: 'app-new-component',
  standalone: true, // ✅ VERY IMPORTANT
  imports: [],
  templateUrl: './new-component.component.html',
  styleUrl: './new-component.component.css'
})
export class NewComponentComponent {

}