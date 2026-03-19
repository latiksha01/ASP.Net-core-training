import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true
})
export class StatusColorDirective implements OnChanges {

  @Input() appStatusColor!: number;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    const element = this.el.nativeElement;

    // Common box styling
    element.style.padding = '10px';
    element.style.margin = '10px 0';
    element.style.borderRadius = '8px';
    element.style.color = 'white';
    element.style.fontWeight = 'bold';

    if (this.appStatusColor >= 50) {
      // PASS → Green box
      element.style.backgroundColor = '#28a745';
    } else {
      // FAIL → Red box
      element.style.backgroundColor = '#dc3545';
    }
  }
}