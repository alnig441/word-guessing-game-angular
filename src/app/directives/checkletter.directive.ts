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
    console.log('e ',e.key, e.code)

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

    if(e.key.length === 1) {

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

      this.newIdEvent.emit({ id: getNextId(id, totalLetters, true), correct: isCorrect });
    }

    if(e.code.toLowerCase() === 'backspace') {
      this.newIdEvent.emit({ id: getNextId(id, totalLetters, false) , delete: true })
    }

    if(e.code.toLowerCase() === 'tab') {
      console.log('tab')

    }

  }


}

function getNextId (id: any, letters : number, next : boolean ) {
  console.log('net next id: ', id, letters, next)
  let inputs = document.getElementsByTagName('input');
  let i : number = 0;
  let j : number = letters;
  let nextId : string = '';
  let attr : any = 'id';

  while(i < j) {
    console.log('rotating?')
    if(inputs[i].attributes[attr].value === id) {
      console.log('get in there')
      if(next) {
        console.log('not deleting')
        nextId = inputs[i+1].attributes[attr].value;
        break;
      }
      if(!next) {
        console.log('deleting')
        if(i > 0) {
          nextId = inputs[i-1].attributes[attr].value;
        }
        break;
      }
    }
    i++;
  }
  return nextId;
}
