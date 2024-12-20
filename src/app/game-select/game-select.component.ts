import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameStatusService } from '../services/game-status.service';
import { TimerService } from '../services/timer.service';
import { StartPageComponent } from '../start-page/start-page.component';

export interface Scenario {
  title: string;
  minigames: { game: string; solved: boolean }[];
}

export let selectedScenario!: Scenario;

@Component({
  selector: 'app-game-select',
  templateUrl: './game-select.component.html',
  styleUrls: ['./game-select.component.css'],
})
export class GameStartComponent implements OnInit {
  @HostListener('window:beforeunload') goToPage() {
    this.router.navigate(['/hello']);
  }

  isFullscreen!: string;

  constructor(
    public timerService: TimerService,
    private router: Router,
    public gameSolved: GameStatusService
  ) {}

  allEqual(array: { game: string; solved: boolean }[]) {
    return (
      array.filter((element) => {
        return element.solved === true;
      }).length === array.length
    );
  }

  ngOnInit(): void {
    this.gameSolved.gameSolved.subscribe(
      (resp: { game: string; solved: boolean }) => {
        let scenarioSolved: any = this.gameSolved.scenario.minigames.findIndex(
          (object) => {
            return object.game === resp.game;
          }
        );
        this.gameSolved.scenario.minigames[scenarioSolved].solved = true;
        const isItWon = this.allEqual(this.gameSolved.scenario.minigames);
        if (isItWon) {
          this.router.navigate(['/you-win']);
        }
      }
    );
    this.gameSolved.scenario =
      StartPageComponent.scenarios[StartPageComponent.rand];

    this.timerService.startTimer();
  }
}
