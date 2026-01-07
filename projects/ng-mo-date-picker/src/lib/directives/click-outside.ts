import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({
  selector: '[moClickOutside]',
})
export class ClickOutside {

  clickOutside = output<void>();

  private elementRef = inject(ElementRef);


  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target) return;

    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }

}
