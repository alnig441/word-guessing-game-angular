import { Component, OnInit, HostListener, Directive, ElementRef } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ApiService } from '../../services/api.service';
import { PreventDefaultDirective } from '../../directives/prevent-default.directive';
import { StopPropagationDirective } from '../../directives/stop-propagation.directive';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  sentence : string = '';
  challengeComplete : boolean = true;
  private inputs : any = document.getElementsByTagName('input');

  constructor(
    private game : GameService,
    private api: ApiService,
    private input: ElementRef
  ) { }

  ngOnInit(): void {
    this.api.originalSentence$.subscribe(value => this.sentence = value);

  }

  @HostListener('click', ['$event'])
  onClick() {
    this.game.next()
  }

  onNewId(value: any) {
    console.log('new id: ', value)
    let i : number = 0;
    let j : number = this.inputs.length -1;
    let attr: any = "id";

    while(i < j) {
      if(this.inputs[i].attributes[attr].value === value) {
        this.inputs[i].focus();
        break;
      }
      i++;
    }

  }


}
