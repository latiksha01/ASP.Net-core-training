import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {

  @Input() appHighlight!: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appHighlight > 85) {
      this.el.nativeElement.style.border = '2px solid gold';
      this.el.nativeElement.style.backgroundColor = '#fff8dc';
    }
  }
}