import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopPropagation]'
})
export class StopPropagationDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  onClick(btn: any) {
    btn.stopPropagation();
  }

}
