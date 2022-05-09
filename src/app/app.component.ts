import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { GameService } from './services/game.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [ ApiService ]
})
export class AppComponent implements OnInit {
  title = 'meltwater';
  gameComplete: boolean = false;

  constructor(
    private api: ApiService,
    private game: GameService
  ){}

  ngOnInit() {
    this.api.get(10);
    this.game.complete$.subscribe(value => this.gameComplete = value)
  }

}
