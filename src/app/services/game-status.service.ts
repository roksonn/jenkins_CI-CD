import { EventEmitter, Injectable } from '@angular/core';
import { Scenario } from '../game-select/game-select.component';

@Injectable({
  providedIn: 'root',
})
export class GameStatusService {
  gameSolved: EventEmitter<{ game: string; solved: boolean }>;
  gameSelectedKeypads: string[] = [];
  gameSelectedPasswords: string = '';
  gameSelectedButton: string = '';
  gameSelectedFirst: string = '';
  gameSelectedLabyrinth: { path: string[]; color: string } = {
    path: [],
    color: '',
  };
  scenario!: Scenario;

  constructor() {
    this.gameSolved = new EventEmitter<{ game: string; solved: boolean }>();
  }

  reset() {
    this.scenario.minigames.forEach((status) => {
      status.solved = false;
    });
    this.gameSelectedKeypads = [];
    this.gameSelectedPasswords = '';
    this.gameSelectedButton = '';
    this.gameSelectedFirst = '';
    this.gameSelectedLabyrinth = { path: [], color: '' };
  }
}
