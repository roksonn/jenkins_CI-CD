import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { GameStatusService } from '../../services/game-status.service';
import { TimerService } from '../../services/timer.service';

export interface Resp {
  text: string;
  status: number;
}

@Component({
  selector: 'app-keypads',
  templateUrl: './keypads.component.html',
  styleUrls: ['./keypads.component.css'],
})
export class KeypadsComponent implements OnInit, AfterViewInit {
  @ViewChild('button1') button1!: ElementRef;
  @ViewChild('button2') button2!: ElementRef;
  @ViewChild('button3') button3!: ElementRef;
  @ViewChild('button4') button4!: ElementRef;
  @ViewChild('modal') modal!: ElementRef;

  message: string = '';

  solutions = [
    ['&#167;', '&#8456;', '&#8489;', '&#8493;'],
    ['&#8501;', '&#9795;', '&#9799;', '&#9879;'],
    ['&#8452;', '&#8467;', '&#8472;', '&#8483;'],
    ['&#8506;', '&#8526;', '&#9767;', '&#9987;'],
  ];
  selectedSolution: string[] = [];
  userInput: string[] = [];
  scrambledSolution: string[] = [];

  symbol!: Symbol;

  constructor(
    private http: HttpClient,
    public timerService: TimerService,
    private gameSolved: GameStatusService,
    private router: Router
  ) {}

  getItem(number: number): string {
    return this.scrambledSolution[number];
  }

  ngOnInit() {
    console.log(this.gameSolved.gameSelectedKeypads.length);
    if (this.gameSolved.gameSelectedKeypads.length === 0)
      this.gameSolved.gameSelectedKeypads =
        this.solutions[Math.floor(Math.random() * 4)];
    this.selectedSolution = this.gameSolved.gameSelectedKeypads;
    this.scrambledSolution = [...this.selectedSolution];
    this.shuffleArray(this.scrambledSolution);
  }

  ngAfterViewInit() {
    this.resetButtons();
  }

  checkSolution(reference: HTMLButtonElement) {
    reference.disabled = true;
    reference.children[0].classList.add('btn-pressed');
    reference.children[0].classList.remove('btn-reset');
    //await this.sleep(500);

    if (this.userInput.length == 3) {
      this.userInput.push(reference.value);
      console.log(this.userInput);
      console.log(this.selectedSolution);
      console.log(reference.children[0]);
      reference.children[0].classList.remove('btn-reset');
      reference.children[0].classList.add('btn-pressed');

      this.http
        .post(`https://suas206-vm.su.ro.conti.de:36299/RightOrder`, {
          payload: {
            input: this.userInput.join(''),
            solutionSelected: this.selectedSolution.join(''),
          },
        })
        .subscribe({
          next: (response: Resp | any) => {
            console.log('response:', response);
            if (response.status == 200) {
              this.message = 'Bravo! Treci la urmatoarea problema.';
              this.solutionButtons();
            } else {
              this.message = 'Problema persista. Mai incearca!';
              this.resetButtons();
            }
            this.modal.nativeElement.showModal();
            this.userInput.length = 0;
          },
          error: (error) => {
            console.log('error:', error);
            this.resetButtons();
            this.userInput.length = 0;
          },
        });
    } else {
      this.userInput.push(reference.value);
    }
  }

  resetButtons() {
    this.button1.nativeElement.classList.remove('buttonPressed');
    this.button1.nativeElement.disabled = false;
    this.button1.nativeElement.children[0].classList.remove('btn-pressed');
    this.button1.nativeElement.children[0].classList.remove('solution-correct');
    this.button1.nativeElement.children[0].classList.add('btn-reset');

    this.button2.nativeElement.classList.remove('buttonPressed');
    this.button2.nativeElement.disabled = false;
    this.button2.nativeElement.children[0].classList.remove('btn-pressed');
    this.button2.nativeElement.children[0].classList.remove('solution-correct');
    this.button2.nativeElement.children[0].classList.add('btn-reset');

    this.button3.nativeElement.classList.remove('buttonPressed');
    this.button3.nativeElement.disabled = false;
    this.button3.nativeElement.children[0].classList.remove('btn-pressed');
    this.button3.nativeElement.children[0].classList.remove('solution-correct');
    this.button3.nativeElement.children[0].classList.add('btn-reset');

    this.button4.nativeElement.classList.remove('buttonPressed');
    this.button4.nativeElement.disabled = false;
    this.button4.nativeElement.children[0].classList.remove('btn-pressed');
    this.button4.nativeElement.children[0].classList.remove('solution-correct');
    this.button4.nativeElement.children[0].classList.add('btn-reset');

    this.userInput.length = 0;
  }

  solutionButtons() {
    this.button1.nativeElement.children[0].classList.remove('btn-pressed');
    this.button1.nativeElement.children[0].classList.add('solution-correct');
    this.button1.nativeElement.children[0].classList.remove('btn-reset');

    this.button2.nativeElement.children[0].classList.remove('btn-pressed');
    this.button2.nativeElement.children[0].classList.add('solution-correct');
    this.button2.nativeElement.children[0].classList.remove('btn-reset');

    this.button3.nativeElement.children[0].classList.remove('btn-pressed');
    this.button3.nativeElement.children[0].classList.add('solution-correct');
    this.button3.nativeElement.children[0].classList.remove('btn-reset');

    this.button4.nativeElement.children[0].classList.remove('btn-pressed');
    this.button4.nativeElement.children[0].classList.add('solution-correct');
    this.button4.nativeElement.children[0].classList.remove('btn-reset');
  }

  closeModal() {
    if (this.message === 'Bravo! Treci la urmatoarea problema.') {
      this.router.navigate(['/game-select']);
      this.gameSolved.gameSolved.emit({
        game: '/keypads',
        solved: true,
      });
    }
    this.modal.nativeElement.close();
  }

  shuffleArray(array: string[]): string[] {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
}
