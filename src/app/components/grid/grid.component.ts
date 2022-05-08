import { Component, OnInit, HostListener, Directive } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ApiService } from '../../services/api.service';
import { PreventDefaultDirective } from '../../directives/prevent-default.directive';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  sentence : string = '';
  challengeComplete : boolean = true;

  constructor(
    private game : GameService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.originalSentence$.subscribe(value => this.sentence = value);
  }

  @HostListener('click', ['$event'])
  onClick() { this.game.next() }

}
