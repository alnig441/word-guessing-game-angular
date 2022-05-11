import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./sentence.component.css']
})
export class SentenceComponent implements OnInit {

  sentence: string = '';
  scrambledSentence: string = 'scrambled sentence here';
  errorMessage: string = ''
  errorType: string = '';

  constructor(
    private api: ApiService,
    private game: GameService
  ) { }

  ngOnInit(): void {
    this.api.originalSentence$.subscribe(
      value => {
        this.sentence = value
        this.scrambledSentence = this.game.scrambleWords(value)
      });

    this.api.error$.subscribe((value : any ) => {
      let status = value.status ? parseInt(value.status) : 0;
      if(value.message) {
        console.log(value.message)
        this.errorMessage = value.message;
      }
      if(status >= 300 && status < 400) {
        this.errorType = 'warning'
      }
      if(status >= 400) {
        this.errorType = 'error'
      }
    })

    this.game.counter$.subscribe(value => this.api.get(value))

  }


}
