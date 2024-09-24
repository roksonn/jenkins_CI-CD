import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameStartComponent } from './game-select/game-select.component';
import { ButtonComponent } from './mini-games/button/button.component';
import { KeypadsComponent } from './mini-games/keypads/keypads.component';
import { LabyrinthComponent } from './mini-games/labyrinth/labyrinth.component';
import { PasswordsComponent } from './mini-games/passwords/passwords.component';
import { WhoIsFirstComponent } from './mini-games/who-is-first/who-is-first.component';
import { WiresComponent } from './mini-games/wires/wires.component';
import { StartPageComponent } from './start-page/start-page.component';
import { TriviaComponent } from './trivia/trivia.component';
import { YouLoseComponent } from './you-lose/you-lose.component';
import { YouWinComponent } from './you-win/you-win.component';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: 'start',
    component: StartPageComponent,
  },
  { path: 'game-select', component: GameStartComponent },
  {
    path: 'keypads',
    component: KeypadsComponent,
  },
  {
    path: 'wires',
    component: WiresComponent,
  },
  {
    path: 'passwords',
    component: PasswordsComponent,
  },
  {
    path: 'button',
    component: ButtonComponent,
  },
  {
    path: 'you-win',
    component: YouWinComponent,
  },
  {
    path: 'you-lose',
    component: YouLoseComponent,
  },
  {
    path: 'trivia',
    component: TriviaComponent,
  },
  {
    path: 'who-is-first',
    component: WhoIsFirstComponent,
  },
  {
    path: 'labyrinth',
    component: LabyrinthComponent,
  },
  {
    path: '**',
    component: StartPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
