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

  constructor(private api: ApiService){}

  ngOnInit() {
    this.api.get(1);
  }

}
