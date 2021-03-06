import { Injectable } from '@angular/core';
import { Observable, throwError, of, BehaviorSubject, Subject, from } from 'rxjs';
import { ApiService } from './api.service';

@Injectable(
  // { providedIn: 'root' }
)
export class GameService {

  private counterSubject = new BehaviorSubject(1);
  counter$ = this.counterSubject.asObservable();

  private scoreSubject = new BehaviorSubject(0);
  score$ = this.scoreSubject.asObservable();

  private completeSubject = new BehaviorSubject(false);
  complete$ = this.completeSubject.asObservable();

  constructor(
    private api: ApiService,
  ) { }

  scrambleWords(sentence: string) : string {
    let words = sentence.split(' ');
    return splitWords(words);
  }

  next() : void {
    let currentCounter = this.counterSubject.value;
    let currentScore = this.scoreSubject.value;

    if(currentCounter < 10) {
      this.counterSubject.next(currentCounter + 1)
      this.scoreSubject.next(currentScore + 1)
    } else {
      this.completeSubject.next(true);
    }
    return
  }

}


  function splitWords(words: any) {

    let sentence = "";

    for(var i = 0, l = words.length ; i < l ; i ++) {
      if (words[i].length > 3) {
        sentence += scramble(words[i]);
      } else {
        sentence += words[i];
      }
      if(i <= (l - 1)) {
        sentence += " ";
      }
    }

    return sentence;
  }

  function scramble(word: string){
    const WORD = word.split('');
    const BEGIN = WORD.shift();
    const END : any = WORD.pop();

    let scrambled : any = BEGIN;
    let reducedWord = WORD;

    for(var i = 0 ; i < reducedWord.length ; ) {
      let targetIndex = Math.round(Math.random() * (reducedWord.length - 1));
      scrambled += reducedWord.splice(targetIndex, 1);
    }

    scrambled += END;
    return scrambled ;
  }
