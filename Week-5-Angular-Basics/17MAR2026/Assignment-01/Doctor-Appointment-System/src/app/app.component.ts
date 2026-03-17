import { Component } from '@angular/core';
import { AppointmentComponent } from './appointment/appointment.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppointmentComponent],
  template: '<app-appointment></app-appointment>'
})
export class AppComponent {}