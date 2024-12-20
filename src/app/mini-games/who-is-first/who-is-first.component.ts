import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameStatusService } from '../../services/game-status.service';
import { TimerService } from '../../services/timer.service';
import { Resp } from '../keypads/keypads.component';

@Component({
  selector: 'app-who-is-first',
  templateUrl: './who-is-first.component.html',
  styleUrls: ['./who-is-first.component.css'],
})
export class WhoIsFirstComponent implements OnInit {
  displayWord!: string;

  @ViewChild('button1') button1!: HTMLButtonElement;
  @ViewChild('button2') button2!: HTMLButtonElement;
  @ViewChild('button3') button3!: HTMLButtonElement;
  @ViewChild('button4') button4!: HTMLButtonElement;
  @ViewChild('modal') modal!: ElementRef;

  message: string = '';
  array!: string[];

  constructor(
    public timerService: TimerService,
    private http: HttpClient,
    private router: Router,
    private gameSolved: GameStatusService
  ) {}

  words = [
    { word: 'SCRAP', list: ['PASS', 'CLIENT SCRAP', 'FAIL', 'SCRAP'] },
    { word: 'PASS', list: ['FAIL', 'SCRAP', 'PASS', 'CLIENT SCRAP'] },
    { word: 'FAIL', list: ['SCRAP', 'PASS', 'CLIENT SCRAP', 'FAIL'] },
    { word: 'CLIENT SCRAP', list: ['CLIENT SCRAP', 'SCRAP', 'PASS', 'FAIL'] },
  ];

  link = ['ICT', 'FLASH', 'DISPENSING', 'LABELING'];

  ngOnInit() {
    this.http
      .get('https://suas206-vm.su.ro.conti.de:36299/getWordForDisplay')
      .subscribe({
        next: (response: Resp | any) => {
          if (this.gameSolved.gameSelectedFirst.length === 0)
            this.gameSolved.gameSelectedFirst = response.text;
          this.displayWord = this.gameSolved.gameSelectedFirst;
        },
        error: (error) => {
          console.log(error);
        },
      });

    this.array = this.words.map((a) => {
      return a.word;
    });

    this.array = this.shuffleArray(this.array);
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

  checkAnswer(value: string | null) {
    // if (this.displayWord === 'DISPENSING') {
    //   if (
    //     value?.trimEnd().trimStart() ===
    //     this.words[this.link.indexOf(this.displayWord)].list[0]
    //   ) {
    //     this.message = 'Bravo sefule, treci la urmatorul';
    //   } else {
    //     this.message = 'Nu e bine Boss, mai incearca';
    //   }
    // }

    // if (this.displayWord === 'ICT') {
    //   if (value?.trimEnd().trimStart() ===  this.words[this.link.indexOf(this.displayWord)].list[0]) {
    //     this.message = 'Bravo sefule, treci la urmatorul';
    //   } else {
    //     this.message = 'Nu e bine Boss, mai incearca';
    //   }
    // }

    // if (this.displayWord === 'LABELING') {
    //   if (value?.trimEnd().trimStart() ===  this.words[this.link.indexOf(this.displayWord)].list[0]) {
    //     this.message = 'Bravo sefule, treci la urmatorul';
    //   } else {
    //     this.message = 'Nu e bine Boss, mai incearca';
    //   }
    // }

    // if (this.displayWord === 'FLASH') {
    //   if (value?.trimEnd().trimStart() ===  this.words[this.link.indexOf(this.displayWord)].list[0]) {
    //     this.message = 'Bravo sefule, treci la urmatorul';
    //   } else {
    //     this.message = 'Nu e bine Boss, mai incearca';
    //   }
    // }

    if (
      value?.trimEnd().trimStart() ===
      this.words[this.link.indexOf(this.displayWord)].list[0]
    ) {
      this.message = 'Bravo! Treci la urmatoarea problema.';
    } else {
      this.message = 'Problema persista. Mai incearca!';
    }

    this.modal.nativeElement.showModal();
  }

  closeModal() {
    if (this.message === 'Bravo! Treci la urmatoarea problema.') {
      this.router.navigate(['/game-select']);
      this.gameSolved.gameSolved.emit({ game: '/who-is-first', solved: true });
    } else {
      this.modal.nativeElement.close();
    }
  }
}
