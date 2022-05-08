import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventDefault]'
})
export class PreventDefaultDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  onClick(btn: any) {
    btn.preventDefault();
  }

  @HostListener('keydown.enter', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
  }

}
