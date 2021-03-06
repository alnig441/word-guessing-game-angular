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
    const isSpace : boolean = (e.code === 'Space' && input.attributes['class'].value === 'space');
    const isLetter : boolean = (input.attributes['class'].value === 'letter');
    let isCorrect : boolean = false;
    let finalInputId: string;
    let isFinalInput: boolean = false;

    this.api.originalSentence$.subscribe((value) => {
      totalLetters = value.length - 1;
      words = value.split(' ');
      finalInputId = `${words.length -1}${words[words.length -1].length -1}`;
      isFinalInput = (finalInputId === id);
    });

    if(e.key.length === 1) {
      if(isLetter) {
        word = parseInt(id.slice(0,1));
        letter = parseInt(id.slice(1));
        if(words[word][letter].toLowerCase() === e.key.toLowerCase()) {
          input.value = e.key;
          input.setAttribute('disabled', true);
          isCorrect = true;
        }
      }

      if(isSpace) {
        input.setAttribute('disabled', true);
        isCorrect = true;
      }

      this.newIdEvent.emit({ id: getNextId(id, totalLetters, true), correct: isCorrect, isFinalInput: isFinalInput });
    }

    if(e.code.toLowerCase() === 'backspace') {
      this.newIdEvent.emit({ id: getNextId(id, totalLetters, false) , delete: true, isFinalInput: isFinalInput })
    }

    if(e.code.toLowerCase() === 'tab') {
      console.log('tab')

    }

  }


}

function getNextId (id: any, letters : number, next : boolean ) {
  let inputs = document.getElementsByTagName('input');
  let i : number = 0;
  let j : number = letters;
  let nextId : string = '';
  let attr : any = 'id';

  while(i < j) {
    if(inputs[i].attributes[attr].value === id) {
      if(next) {
        nextId = inputs[i+1].attributes[attr].value;
        break;
      }
      if(!next) {
        if(i > 0) {
          nextId = inputs[i-1].attributes[attr].value;
        }
        break;
      }
    }
    i++;
  }

  if(i === j && !next) {
    nextId = inputs[i-1].attributes[attr].value;
  }

  return nextId;
}
