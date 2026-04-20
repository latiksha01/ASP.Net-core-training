import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  @Input() userStats!: { name: string; score: number; level: string };
}