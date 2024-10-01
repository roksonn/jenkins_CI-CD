import { Component } from '@angular/core';
import { TimerService } from '../services/timer.service';
import { GameStatusService } from '../services/game-status.service';

@Component({
  selector: 'app-you-lose',
  templateUrl: './you-lose.component.html',
  styleUrls: ['./you-lose.component.css'],
})
export class YouLoseComponent {
  constructor(
    private timerService: TimerService,
    private gameStatus: GameStatusService
  ) {}

  ngOnInit(): void {
    this.timerService.resetAll();
    this.gameStatus.reset();
    console.log(this.gameStatus.scenario);
  }
}
