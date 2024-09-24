import { Component, OnInit } from '@angular/core';
import { TimerService } from '../services/timer.service';
import { GameStatusService } from '../services/game-status.service';

@Component({
  selector: 'app-you-win',
  templateUrl: './you-win.component.html',
  styleUrls: ['./you-win.component.css'],
})
export class YouWinComponent implements OnInit {
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
