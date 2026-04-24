import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  @Input() weatherData: any[] = [];

  cityName: string = '';
  result: any = null;
  searched: boolean = false;

  searchCity() {
    this.searched = false;
    this.result = null;

    if (this.cityName.trim() === '') return;

    const found = this.weatherData.find(city =>
      city.name.toLowerCase() === this.cityName.toLowerCase()
    );

    this.searched = true;
    this.result = found || null;
  }
}