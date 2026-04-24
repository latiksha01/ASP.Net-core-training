import { Component } from '@angular/core';
import { WeatherComponent } from './weather/weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WeatherComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

weatherData = [
  { name: 'Delhi', temperature: '35°C', wind: '8 km/h', humidity: '40%' },
  { name: 'Mumbai', temperature: '30°C', wind: '12 km/h', humidity: '75%' },
  { name: 'Bangalore', temperature: '28°C', wind: '10 km/h', humidity: '60%' },
  { name: 'Hyderabad', temperature: '32°C', wind: '9 km/h', humidity: '50%' },
  { name: 'Chennai', temperature: '33°C', wind: '11 km/h', humidity: '70%' },
  { name: 'Kolkata', temperature: '34°C', wind: '7 km/h', humidity: '80%' },
  { name: 'Pune', temperature: '27°C', wind: '6 km/h', humidity: '55%' },
  { name: 'Jaipur', temperature: '36°C', wind: '5 km/h', humidity: '30%' },
  { name: 'Ahmedabad', temperature: '38°C', wind: '8 km/h', humidity: '35%' },
  { name: 'Lucknow', temperature: '33°C', wind: '7 km/h', humidity: '45%' }
];
}