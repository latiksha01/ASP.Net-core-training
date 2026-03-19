import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClickBlock]',
  standalone: true
})
export class ClickBlockDirective {

  @Input() appClickBlock!: boolean;

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (!this.appClickBlock) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}