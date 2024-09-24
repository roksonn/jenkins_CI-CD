import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameStatusService } from '../../services/game-status.service';
import { TimerService } from '../../services/timer.service';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @ViewChild('hold') holdButton!: HTMLButtonElement;
  @ViewChild('strip') strip!: ElementRef;
  @ViewChild('modal') modal!: ElementRef;

  checkedToggle: boolean = false;
  checkedButton: boolean = false;
  checkedName: boolean = false;

  message: string = '';

  lines: string[] = ['SP21', 'PSA_BSRF', 'BCM_PAG', 'PIU/PCU', 'AUDI_DCM'];

  randomLine: string = 'test';

  constructor(
    public timerService: TimerService,
    private gameSolved: GameStatusService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toggle() {
    this.checkedToggle = !this.checkedToggle;
    this.checkedName = !this.checkedName;
    this.checkedButton = !this.checkedButton;
    if (this.gameSolved.gameSelectedButton.length === 0) {
      this.gameSolved.gameSelectedButton =
        this.lines[Math.floor(Math.random() * 5)];
    }

    this.randomLine = this.gameSolved.gameSelectedButton;
  }

  holdClick() {
    if (this.randomLine === 'SP21') {
      if (
        (this.timerService.minutes + '').includes('3') ||
        (this.timerService.seconds + '').includes('3')
      ) {
        this.message = 'Bravo! Treci la urmatoarea problema.';
      } else {
        this.message = 'Problema persista. Mai incearca!';
      }
    }

    if (this.randomLine === 'PSA_BSRF') {
      if (
        (this.timerService.minutes + '').includes('2') ||
        (this.timerService.seconds + '').includes('1') ||
        (this.timerService.minutes + '').includes('1') ||
        (this.timerService.seconds + '').includes('2')
      ) {
        this.message = 'Bravo! Treci la urmatoarea problema.';
      } else {
        this.message = 'Problema persista. Mai incearca!';
      }
    }

    if (this.randomLine === 'BCM_PAG') {
      if (
        (this.timerService.minutes + '').includes('1') ||
        (this.timerService.seconds + '').includes('1')
      ) {
        this.message = 'Bravo! Treci la urmatoarea problema.';
      } else {
        this.message = 'Problema persista. Mai incearca!';
      }
    }

    if (this.randomLine === 'PIU/PCU') {
      if (
        (this.timerService.minutes + '').includes('2') ||
        (this.timerService.seconds + '').includes('2')
      ) {
        this.message = 'Bravo! Treci la urmatoarea problema.';
      } else {
        this.message = 'Problema persista. Mai incearca!';
      }
    }

    if (this.randomLine === 'AUDI_DCM') {
      if (
        (this.timerService.minutes + '').includes('9') ||
        (this.timerService.seconds + '').includes('9')
      ) {
        this.message = 'Bravo! Treci la urmatoarea problema.';
      } else {
        this.message = 'Problema persista. Mai incearca!';
      }
    }
    this.modal.nativeElement.showModal();
  }

  closeModal() {
    if (this.message === 'Bravo! Treci la urmatoarea problema.') {
      this.router.navigate(['/game-select']);
      this.gameSolved.gameSolved.emit({ game: '/button', solved: true });
    } else {
      this.modal.nativeElement.close();
    }
  }
}
