import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';

@Directive({
  selector: '[checkLetter]'
})
export class CheckletterDirective {

  constructor(
    private input: ElementRef,
    private api: ApiService
  ) { }

  @Output() newIdEvent = new EventEmitter<string>();

  @HostListener('keyup', ['$event'])
  onKeyUp(e: any) {
    let input = this.input.nativeElement;
    let word: number, letter : number ;
    let words : any = [];
    let id : string = this.input.nativeElement.attributes['id'].value;
    let isSpace : boolean = (e.code === 'Space' && input.attributes['class'].value === 'space')

    if(id.length === 2) {
      word = parseInt(id[0]);
      letter = parseInt(id[1]);
      this.api.originalSentence$.subscribe((value) => words = value.split(' '));

      if(words[word][letter].toLowerCase() === this.input.nativeElement.value) {
        input.setAttribute('disabled', true);
        input.setAttribute("style", "background-color:#4caf50")
      }
    }

    if(isSpace) {
      input.setAttribute('disabled', true);
      input.setAttribute("style", "background-color:#4caf50")
    }

    this.newIdEvent.emit(getNextId(id));

  }

}

function getNextId (id: any) {
  let inputs = document.getElementsByTagName('input')
  let i : number = 0;
  let j : number = inputs.length -1;
  let nextId : string = '';
  let attr : any = 'id';

  while(i < j) {
    if(inputs[i].attributes[attr].value === id) {
      nextId = inputs[i+1].attributes[attr].value;
      break;
    }
    i++;
  }
  return nextId;
}
