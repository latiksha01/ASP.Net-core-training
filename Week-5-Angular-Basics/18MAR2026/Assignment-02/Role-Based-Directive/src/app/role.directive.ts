import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appRole(role: string) {
    this.viewContainer.clear();

    if (role === 'admin') {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}