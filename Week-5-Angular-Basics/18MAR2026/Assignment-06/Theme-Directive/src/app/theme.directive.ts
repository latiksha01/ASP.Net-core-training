import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective implements OnChanges {

  @Input() appTheme!: string; // 'dark' or 'light'

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    const element = this.el.nativeElement;

    if (this.appTheme === 'dark') {
      // 🌙 Dark Mode
      element.style.backgroundColor = '#121212';
      element.style.color = '#ffffff';
    } else {
      // ☀️ Light Mode
      element.style.backgroundColor = '#ffffff';
      element.style.color = '#000000';
    }
  }
}