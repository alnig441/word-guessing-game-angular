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
import { SanitizeDirective } from './directives/sanitize.directive';
import { PreventDefaultDirective } from './directives/prevent-default.directive';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    SentenceComponent,
    InstructionsComponent,
    ScoreComponent,
    SanitizeDirective,
    PreventDefaultDirective
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
