import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable(
  // { providedIn: 'root' }
)
export class GameService {

  scrambledSentence$: string = 'scrambled sentence here';

  constructor(
    private api: ApiService,
  ) { }

  scrambleWords(sentence: string) : string {
    let words = sentence.split(' ');
    return splitWords(words);
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
