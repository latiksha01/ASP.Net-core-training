import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  //Apply Highlight
  @HostListener(`mouseenter`)
  onMouseEnter()
  {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  //remove Highlight
  @HostListener(`mouseleave`)
  onMouseLeave()
  {
    this.el.nativeElement.style.backgroundColor = 'transparent';
  }

}
