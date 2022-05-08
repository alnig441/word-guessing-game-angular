import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { GameService } from './services/game.service';
import { GridComponent } from './components/grid/grid.component';
import { SentenceComponent } from './components/sentence/sentence.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { ScoreComponent } from './components/score/score.component';
import { PreventDefaultDirective } from './directives/prevent-default.directive';
import { StopPropagationDirective } from './directives/stop-propagation.directive';
import { CheckletterDirective } from './directives/checkletter.directive';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    SentenceComponent,
    InstructionsComponent,
    ScoreComponent,
    PreventDefaultDirective,
    StopPropagationDirective,
    CheckletterDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ApiService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
