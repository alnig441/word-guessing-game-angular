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

  @Output() newIdEvent = new EventEmitter<Object>();

  @HostListener('keyup', ['$event'])
  onKeyUp(e: any) {
    let totalLetters : number = 0;
    let input = this.input.nativeElement;
    let word: number, letter : number ;
    let words : any = [];
    let id : string = this.input.nativeElement.attributes['id'].value;
    let isSpace : boolean = (e.code === 'Space' && input.attributes['class'].value === 'space');
    let isLetter : boolean = (input.attributes['class'].value === 'letter');
    let isCorrect : boolean = false;

    this.api.originalSentence$.subscribe((value) => {
      totalLetters = value.length - 1;
      words = value.split(' ');
    });

    if(isLetter) {
      word = parseInt(id.slice(0,1));
      letter = parseInt(id.slice(1));

      if(words[word][letter].toLowerCase() === this.input.nativeElement.value) {
        input.setAttribute('disabled', true);
        isCorrect = true;
      }

    }

    if(isSpace) {
      input.setAttribute('disabled', true);
      isCorrect = true;
    }

    this.newIdEvent.emit({ id: getNextId(id, totalLetters), correct: isCorrect });

  }

}

function getNextId (id: any, letters : number) {
  let inputs = document.getElementsByTagName('input');
  let i : number = 0;
  let j : number = letters;
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
