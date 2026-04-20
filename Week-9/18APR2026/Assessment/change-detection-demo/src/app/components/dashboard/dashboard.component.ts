import {
  Component, Input,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { StatsComponent } from '../stats/stats.component';

interface LogEntry {
  time: string;
  action: string;
  result: string;
  type: 'broken' | 'fix1' | 'fix2' | 'reset';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatsComponent, NgIf, NgClass, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  @Input() userStats!: { name: string; score: number; level: string };
  lastAction = '';
  log: LogEntry[] = [];
  cdCycles = 0;

  constructor(private cdRef: ChangeDetectorRef) {}

  private addLog(action: string, result: string, type: LogEntry['type']) {
    const now = new Date();
    const time = now.toLocaleTimeString('en', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.log.unshift({ time, action, result, type });
    if (this.log.length > 5) this.log.pop();
    this.cdCycles++;
  }

  updateLocally() {
    this.userStats.score = 100;
    this.lastAction = 'broken';
    this.addLog('updateLocally() — mutation', 'DashboardComponent view NOT updated (same ref)', 'broken');
  }

  fixWithNewReference() {
    this.userStats = { ...this.userStats, score: 200 };
    this.lastAction = 'fix1';
    this.addLog('fixWithNewReference() — spread', 'New reference detected — view UPDATED', 'fix1');
  }

  fixWithMarkForCheck() {
    this.userStats.score = 300;
    this.lastAction = 'fix2';
    this.cdRef.markForCheck();
    this.addLog('fixWithMarkForCheck() — markForCheck()', 'Manual trigger — view UPDATED', 'fix2');
  }

  reset() {
    this.userStats = { ...this.userStats, score: 0 };
    this.lastAction = '';
    this.addLog('reset()', 'Score reset to 0', 'reset');
  }
}