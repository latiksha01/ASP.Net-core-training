import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true
})
export class StatusColorDirective implements OnInit {

  @Input() appStatusColor!: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appStatusColor >= 50) {
      this.el.nativeElement.style.color = 'green';
    } else {
      this.el.nativeElement.style.color = 'red';
    }
  }
}