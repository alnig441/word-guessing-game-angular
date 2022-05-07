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

    this.game.counter$.subscribe(value => this.api.get(value))


    setTimeout(() => {
      this.game.next(3)
    }, 3000);
  }


}
