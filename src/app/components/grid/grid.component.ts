import { Component, OnInit, HostListener, Directive, ElementRef } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ApiService } from '../../services/api.service';
import { PreventDefaultDirective } from '../../directives/prevent-default.directive';
import { StopPropagationDirective } from '../../directives/stop-propagation.directive';
import { SetFocusDirective } from '../../directives/set-focus.directive';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  sentence : string = '';
  challengeComplete : boolean = false;
  private correctAnswers : number = 0;
  private inputs : any = document.getElementsByTagName('input');
  private currentInputWithFocus : any ;

  constructor(
    private game : GameService,
    private api: ApiService,
    private input: ElementRef
  ) { }

  ngOnInit(): void {
    this.api.originalSentence$.subscribe((value) =>{
      this.sentence = value
      if(this.inputs[0]) {

        this.inputs[0].focus()

        for(var i = 0, j = this.inputs.length -1 ; i < j ; i ++) {
          this.currentInputWithFocus = 0;
          this.inputs[i].removeAttribute('disabled');
          this.inputs[i].value ="";
        }
      }

    });
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.challengeComplete = false;
    this.correctAnswers = 0;
    this.game.next()
  }

  @HostListener('window:keydown.enter', ['$event'])
  onEnter() {
    if(this.challengeComplete) {
      this.challengeComplete = false;
      this.correctAnswers = 0;
      this.game.next()
    }
  }

  @HostListener('window:click', ["$event"])
  onWindowClick(e : any) {
    if(!this.currentInputWithFocus) this.currentInputWithFocus = 0;
    this.inputs[this.currentInputWithFocus].focus();
  }

  onNewId(value: any) {
    let i : number = 0;
    const j : number = this.inputs.length;
    const attr: any = "id";

    if(value.correct) this.correctAnswers ++;

    this.challengeComplete = (this.correctAnswers === this.inputs.length);

    if(!this.challengeComplete && value.isFinalInput) {
      if(this.inputs[j-1].hasAttribute('disabled')) {
        this.inputs[j-1].removeAttribute('disabled');
        this.inputs[j-1].focus();
        if(value.correct) {
          this.correctAnswers --;
        }
      }
    }


    while(i < j) {

      if(this.inputs[i].attributes[attr].value === value.id) {
        if(value.delete) {
          if(this.inputs[i].hasAttribute('disabled')) {
            this.inputs[i].removeAttribute('disabled');
            this.correctAnswers --;
          }
          this.inputs[i].value = '';
        }
        this.inputs[i].focus();
        this.currentInputWithFocus = i;
        break;
      }
      i++;
    }

  }


}
