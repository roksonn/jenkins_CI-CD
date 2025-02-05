import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { GameStartComponent } from './game-select/game-select.component';
import { KeypadsComponent } from './mini-games/keypads/keypads.component';
import { WiresComponent } from './mini-games/wires/wires.component';
import { PasswordsComponent } from './mini-games/passwords/passwords.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from './mini-games/button/button.component';
import { WhoIsFirstComponent } from './mini-games/who-is-first/who-is-first.component';
import { YouWinComponent } from './you-win/you-win.component';
import { YouLoseComponent } from './you-lose/you-lose.component';
import { TriviaComponent } from './trivia/trivia.component';
import { LabyrinthComponent } from './mini-games/labyrinth/labyrinth.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    GameStartComponent,
    KeypadsComponent,
    WiresComponent,
    PasswordsComponent,
    ButtonComponent,
    WhoIsFirstComponent,
    YouWinComponent,
    YouLoseComponent,
    TriviaComponent,
    LabyrinthComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
