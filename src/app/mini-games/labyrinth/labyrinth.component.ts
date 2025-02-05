import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameStatusService } from '../../services/game-status.service';
import { TimerService } from '../../services/timer.service';
@Component({
  selector: 'app-labyrinth',
  templateUrl: './labyrinth.component.html',
  styleUrls: ['./labyrinth.component.css'],
})
export class LabyrinthComponent implements OnInit {
  @ViewChild('button1') button1!: ElementRef;
  @ViewChild('button2') button2!: ElementRef;
  @ViewChild('button3') button3!: ElementRef;
  @ViewChild('button4') button4!: ElementRef;
  @ViewChild('button5') button5!: ElementRef;
  @ViewChild('button6') button6!: ElementRef;
  @ViewChild('button7') button7!: ElementRef;
  @ViewChild('button8') button8!: ElementRef;
  @ViewChild('button9') button9!: ElementRef;
  @ViewChild('button10') button10!: ElementRef;
  @ViewChild('button11') button11!: ElementRef;
  @ViewChild('button12') button12!: ElementRef;
  @ViewChild('button13') button13!: ElementRef;
  @ViewChild('button14') button14!: ElementRef;
  @ViewChild('button15') button15!: ElementRef;
  @ViewChild('button16') button16!: ElementRef;

  @ViewChild('modal') modal!: ElementRef;

  message: string = '';

  solutions = [
    { path: ['9', '10', '6', '2', '3', '7', '8'], color: 'blue' },
    { path: ['5', '6', '10', '11', '12'], color: 'red' },
    { path: ['13', '14', '10', '11', '7', '3', '4'], color: 'green' },
    { path: ['9', '10', '14', '15', '11', '7', '8'], color: 'yellow' },
  ];
  selectedSolution: string[] = [];
  userInput: string[] = [];
  scrambledSolution: string[] = [];
  color = '';

  symbol!: Symbol;

  constructor(
    public timerService: TimerService,
    private gameSolved: GameStatusService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.gameSolved.gameSelectedLabyrinth.path.length === 0)
      this.gameSolved.gameSelectedLabyrinth =
        this.solutions[Math.floor(Math.random() * 4)];
    this.selectedSolution = this.gameSolved.gameSelectedLabyrinth.path;
    console.log(this.selectedSolution);
    this.color = this.gameSolved.gameSelectedLabyrinth.color;
  }

  checkSolution(reference: HTMLButtonElement) {
    reference.disabled = true;
    this.userInput.push(reference.value);
    if (!this.arraysAreEqual(this.userInput, this.selectedSolution)) {
      for (let i = 0; i < this.userInput.length; i++) {
        if (this.userInput[i] === this.selectedSolution[i]) {
          console.log('e bine');
        } else {
          this.userInput = [];
          this.resetButtons();
          this.message = 'Problema persista. Mai incearca!';
          this.modal.nativeElement.showModal();
        }
      }
      console.log(this.userInput, this.selectedSolution);
    } else {
      this.userInput = [];
      this.resetButtons();
      this.message = 'Bravo! Treci la urmatoarea problema.';
      this.modal.nativeElement.showModal();
    }

    console.log(reference.value);
  }

  arraysAreEqual<T>(array1: T[], array2: T[]): boolean {
    // Check if the arrays have the same length
    if (array1.length !== array2.length) {
      return false;
    }

    // Iterate through the arrays and compare elements
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }

    // If all elements are equal, return true
    return true;
  }

  resetButtons() {
    this.button1.nativeElement.disabled = false;
    this.button2.nativeElement.disabled = false;
    this.button3.nativeElement.disabled = false;
    this.button4.nativeElement.disabled = false;
    this.button5.nativeElement.disabled = false;
    this.button6.nativeElement.disabled = false;
    this.button7.nativeElement.disabled = false;
    this.button8.nativeElement.disabled = false;
    this.button9.nativeElement.disabled = false;
    this.button10.nativeElement.disabled = false;
    this.button11.nativeElement.disabled = false;
    this.button12.nativeElement.disabled = false;
    this.button13.nativeElement.disabled = false;
    this.button14.nativeElement.disabled = false;
    this.button15.nativeElement.disabled = false;
    this.button16.nativeElement.disabled = false;
  }

  closeModal() {
    if (this.message === 'Bravo! Treci la urmatoarea problema.') {
      this.router.navigate(['/game-select']);
      this.gameSolved.gameSolved.emit({
        game: '/labyrinth',
        solved: true,
      });
    }
    this.modal.nativeElement.close();
  }
}
