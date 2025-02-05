import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameStatusService } from '../../services/game-status.service';
import { TimerService } from '../../services/timer.service';
import { Resp } from '../keypads/keypads.component';

export interface Column {
  letters: string[];
  currentIndex: number;
}

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css'],
})
export class PasswordsComponent implements OnInit {
  @ViewChild('middleButtonFirstColumn')
  middleButtonFirstColumn!: ElementRef;
  @ViewChild('middleButtonSecondColumn')
  middleButtonSecondColumn!: ElementRef;
  @ViewChild('middleButtonThirdColumn')
  middleButtonThirdColumn!: ElementRef;
  @ViewChild('middleButtonFourthColumn')
  middleButtonFourthColumn!: ElementRef;
  @ViewChild('middleButtonFifthColumn')
  middleButtonFifthColumn!: ElementRef;

  @ViewChild('modal') modal!: ElementRef;

  message: string = '';

  firstColumn: Column = {
    letters: [],
    currentIndex: 0,
  };
  secondColumn: Column = {
    letters: [],
    currentIndex: 1,
  };

  thirdColumn: Column = {
    letters: [],
    currentIndex: 2,
  };

  fourthColumn: Column = {
    letters: [],
    currentIndex: 3,
  };

  fifthColumn: Column = {
    letters: [],
    currentIndex: 4,
  };
  input: string = '';

  ngOnInit(): void {
    this.http.get('https://suas206-vm.su.ro.conti.de:36299/getWord').subscribe({
      next: (response: Resp | any) => {
        if (this.gameSolved.gameSelectedPasswords.length === 0)
          this.gameSolved.gameSelectedPasswords = response.text;
        let string: string = this.gameSolved.gameSelectedPasswords;
        // let shuffledWord = this.scramble(string);
        // this.firstColumn.letters = shuffledWord;
        // this.secondColumn.letters = shuffledWord;
        // this.thirdColumn.letters = shuffledWord;
        // this.fourthColumn.letters = shuffledWord;
        // this.fifthColumn.letters = shuffledWord;

        //mai greu
        this.firstColumn.letters = this.scramble(string);
        this.secondColumn.letters = this.scramble(string);
        this.thirdColumn.letters = this.scramble(string);
        this.fourthColumn.letters = this.scramble(string);
        this.fifthColumn.letters = this.scramble(string);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  scramble(word: string): string[] {
    let strarray = word.split('');
    let i, j, k;
    for (i = 0; i < strarray.length; i++) {
      j = Math.floor(Math.random() * i);
      k = strarray[i];
      strarray[i] = strarray[j];
      strarray[j] = k;
    }
    return strarray;
  }
  constructor(
    private http: HttpClient,
    public timerService: TimerService,
    private router: Router,
    private gameSolved: GameStatusService
  ) {}

  nextL(column: Column) {
    column.currentIndex++;

    if (column.currentIndex > column.letters.length - 1) {
      column.currentIndex = 0;
    }
  }

  lastL(column: Column) {
    column.currentIndex--;

    if (column.currentIndex < 0) {
      column.currentIndex = column.letters.length - 1;
    }
  }

  submit() {
    this.input = `${this.middleButtonFirstColumn.nativeElement.textContent.trim()}${this.middleButtonSecondColumn.nativeElement.textContent.trim()}${this.middleButtonThirdColumn.nativeElement.textContent.trim()}${this.middleButtonFourthColumn.nativeElement.textContent.trim()}${this.middleButtonFifthColumn.nativeElement.textContent.trim()}`;

    console.log(this.modal);

    this.http
      .post('https://suas206-vm.su.ro.conti.de:36299/Password', {
        input: this.input,
      })
      .subscribe({
        next: (response: Resp | any) => {
          console.log(response);
          if (response.status === 200) {
            this.message = 'Bravo! Treci la urmatoarea problema.';
          } else {
            this.message = 'Problema persista. Mai incearca!';
          }
          this.modal.nativeElement.showModal();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  closeModal() {
    if (this.message === 'Bravo! Treci la urmatoarea problema.') {
      this.router.navigate(['/game-select']);
      this.gameSolved.gameSolved.emit({ game: '/passwords', solved: true });
    } else {
      this.modal.nativeElement.close();
    }
  }
}
