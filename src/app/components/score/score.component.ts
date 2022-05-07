import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  score: any;

  constructor(
    private game : GameService,
  ) { }

  ngOnInit(): void {

    this.game.score$.subscribe(value => this.score = value)
    
    }

}
