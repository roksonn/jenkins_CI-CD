import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// import { Observable, Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor(private router: Router) {}

  initialTime: number = 180;
  timeLeft: any;
  interval: any;
  isStarted = false;
  minutes!: number;
  seconds!: number;

  startTimer() {
    if (!this.isStarted) {
      this.isStarted = true;
      this.interval = setInterval(() => {
        if (this.initialTime > 0) {
          this.initialTime--;
        } else {
          this.router.navigate(['/you-lose']);
          this.resetAll();
        }
        this.timeLeft = this.transform(this.initialTime);
      }, 1000);
    }
  }

  transform(value: number): string {
    this.minutes = Math.floor(value / 60);
    this.seconds = value - this.minutes * 60;
    return `${this.minutes}:${this.seconds < 10 ? '0' : ''}${this.seconds}`;
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resetTimer() {
    this.initialTime = 180;
  }

  resetAll() {
    this.pauseTimer();
    this.resetTimer();
    this.isStarted = false;
  }
}
