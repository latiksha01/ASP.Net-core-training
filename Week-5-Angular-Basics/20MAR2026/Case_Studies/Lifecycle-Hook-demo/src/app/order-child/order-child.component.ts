import { Component, Input, OnChanges, OnInit, DoCheck, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnDestroy,SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-order-child',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './order-child.component.html',
  styleUrl: './order-child.component.css'
})
export class OrderChildComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() orderData : any;

  logs : string[] = [];

  log(message : string) {
    this.logs.push(`$(new Date().toLocaleTimeString()) - ${message}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.log('ngOnChanges - input data changed');
  }

  ngOnInit() {
    this.log('ngOnInit - component initialized');
  }

  ngDoCheck() {
    this.log('ngDoCheck - change detection');
  }

  ngAfterContentInit() {
    this.log('ngAfterContentInit - content initialized');
  }

  ngAfterContentChecked() {
    this.log('ngAfterContentChecked - content checked');
  }

  ngOnDestroy() {
    this.log('ngOnDestroy - component destroyed');
  }
  ngAfterViewChecked(){
    this.log('ngAfterViewChecked - view checked');
  }
  ngAfterViewInit() {
    this.log('ngAfterViewInit - view initialized');
  }

}
