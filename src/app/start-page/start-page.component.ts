import { Component } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
})
export class StartPageComponent {
  minigamesArray: string[] = [
    '/keypads',
    '/wires',
    '/passwords',
    '/button',
    '/who-is-first',
    '/labyrinth',
  ];
  games: string[] = [];

  static rand: number;

  static scenarios = [
    {
      title: 'VOLVO TCAM',
      minigames: [
        { game: '/keypads', solved: false },
        { game: '/wires', solved: false },
        { game: '/passwords', solved: false },
      ],
    },
    {
      title: 'PIU/PCU',
      minigames: [
        { game: '/keypads', solved: false },
        { game: '/button', solved: false },
        { game: '/passwords', solved: false },
      ],
    },
    {
      title: 'BSRF',
      minigames: [
        { game: '/keypads', solved: false },
        { game: '/wires', solved: false },
        { game: '/passwords', solved: false },
      ],
    },
  ];

  constructor() {}

  shuffle() {
    let shuffled: string[] = this.minigamesArray.sort(
      () => 0.5 - Math.random()
    );
    this.games = shuffled.slice(0, 3);
    StartPageComponent.rand = Math.floor(Math.random() * 3);

    StartPageComponent.scenarios[StartPageComponent.rand].minigames.length = 0;

    this.games.map((game) => {
      StartPageComponent.scenarios[StartPageComponent.rand].minigames.push({
        game: game,
        solved: false,
      });
    });
  }
}
