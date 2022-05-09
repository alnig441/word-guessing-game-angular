import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[setFocus]'
})
export class SetFocusDirective implements OnInit {

  constructor(
    private input : ElementRef
  ) { }

  ngOnInit(): void {
    this.input.nativeElement.focus();
  }

}
