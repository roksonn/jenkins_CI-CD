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
import { Resp } from '../keypads/keypads.component';


declare var LeaderLine: any;

@Component({
  selector: 'app-wires',
  templateUrl: './wires.component.html',
  styleUrls: ['./wires.component.css'],
})
export class WiresComponent implements OnInit, AfterViewInit {
  buttonsPressed: HTMLButtonElement[] = [];
  lines: any[] = [];
  sentSolution: any = [];
  message: string = '';

  mesaje = [
    ['PING', 'poate fi trimis oricand'],
    ['IDENTIFICATION', 'initializeaza comunicarea cu MES'],
    ['TERMINATE', 'oprirea comunicarii cu MES'],
    ['UNIT_CHECKIN', 'evalueaza daca unit-ul indeplineste conditiile impuse'],
    [
      'UNIT_RESULT',
      'inainte ca piesa sa treaca la urmatoarea statie, stabilind daca unit-ul (piesa) este PASS sau FAIL',
    ],
    [
      'SETUP_CHANGE',
      'poate fi folosit de catre echipament pentru a seta setup-ul unui echipament',
    ],
    [
      'LOAD_MATERIAL',
      'se trimite daca un material este recunoscut de catre echipamentul de productie',
    ],
    [
      'UNIT_CREATE',
      'este folosit pentru a creea un nou unit bazat pe setari sau informatie primita de la server',
    ],
  ];

  mesajeAlese: string[][] = [];

  randnums = [0, 1, 2, 3, 4, 5, 6, 7];

  @ViewChild('option1') button1!: ElementRef;
  @ViewChild('option2') button2!: ElementRef;
  @ViewChild('option3') button3!: ElementRef;
  @ViewChild('option4') button4!: ElementRef;

  @ViewChild('first') def1!: ElementRef;
  @ViewChild('second') def2!: ElementRef;
  @ViewChild('third') def3!: ElementRef;
  @ViewChild('fourth') def4!: ElementRef;

  @ViewChild('modal') modal!: ElementRef;

  constructor(
    private router: Router,
    private http: HttpClient,
    public timerService: TimerService,
    private gameSolved: GameStatusService
  ) {
    router.events.subscribe((val) => {
      this.clearArray();
    });
  }

  ngOnInit(): void {
    this.mesajeAlese.push(this.mesaje[this.getRandomNumber()]);
    this.mesajeAlese.push(this.mesaje[this.getRandomNumber()]);
    this.mesajeAlese.push(this.mesaje[this.getRandomNumber()]);
    this.mesajeAlese.push(this.mesaje[this.getRandomNumber()]);
  }

  ngAfterViewInit(): void {
    this.button1.nativeElement.innerText = this.mesajeAlese[0][0];
    this.button1.nativeElement.value = this.mesajeAlese[0][0];
    this.def1.nativeElement.innerText = this.mesajeAlese[1][1];
    this.def1.nativeElement.value = this.mesajeAlese[1][1];

    this.button2.nativeElement.innerText = this.mesajeAlese[1][0];
    this.button2.nativeElement.value = this.mesajeAlese[1][0];
    this.def2.nativeElement.innerText = this.mesajeAlese[2][1];
    this.def2.nativeElement.value = this.mesajeAlese[2][1];

    this.button3.nativeElement.innerText = this.mesajeAlese[2][0];
    this.button3.nativeElement.value = this.mesajeAlese[2][0];
    this.def3.nativeElement.innerText = this.mesajeAlese[3][1];
    this.def3.nativeElement.value = this.mesajeAlese[3][1];

    this.button4.nativeElement.innerText = this.mesajeAlese[3][0];
    this.button4.nativeElement.value = this.mesajeAlese[3][0];
    this.def4.nativeElement.innerText = this.mesajeAlese[0][1];
    this.def4.nativeElement.value = this.mesajeAlese[0][1];
  }

  drawLine(point: HTMLButtonElement) {
    if (this.buttonsPressed.length == 1) {
      this.buttonsPressed.push(point);
      if (
        (!this.buttonsPressed[0].classList.contains('firstColumn') &&
          !this.buttonsPressed[1].classList.contains('secondColumn')) ||
        (!this.buttonsPressed[0].classList.contains('secondColumn') &&
          !this.buttonsPressed[1].classList.contains('firstColumn'))
      ) {
        const line = new LeaderLine(
          this.buttonsPressed[0],
          this.buttonsPressed[1],

          {
            startPlug: 'disc',
            endPlug: 'disc',
            hide: true,
          }
        );
        line.show('draw', { duration: 250, timing: 'linear' });
        this.lines.push(line);

        if (
          this.buttonsPressed[1].classList.contains('firstColumn') ||
          this.buttonsPressed[0].classList.contains('secondColumn')
        ) {
          let aux = this.buttonsPressed[1];
          this.buttonsPressed[1] = this.buttonsPressed[0];
          this.buttonsPressed[0] = aux;
        }

        this.sentSolution.push([
          this.buttonsPressed[0].value,
          this.buttonsPressed[1].value,
        ]);

        this.buttonsPressed.length = 0;
      } else {
        this.buttonsPressed.length = 0;
      }
    } else {
      this.buttonsPressed.push(point);
    }
  }

  clearArray() {
    this.buttonsPressed.length = 0;
    this.sentSolution.length = 0;
    this.lines.forEach((element) => {
      element.remove();
    });
    this.lines.length = 0;
  }

  submit() {
    if (this.sentSolution.length === 4) {
      this.http
        .post(`https://suas206-vm.su.ro.conti.de:36299/WireRightOrder2`, {
          input: this.sentSolution,
        })
        .subscribe({
          next: (response: Resp | any) => {
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
  }

  closeModal() {
    if (this.message === 'Bravo! Treci la urmatoarea problema.') {
      this.router.navigate(['/game-select']);
      this.gameSolved.gameSolved.emit({ game: '/wires', solved: true });
    } else {
      this.clearArray();
    }
    this.modal.nativeElement.close();
  }

  getRandomNumber() {
    let m = Math.floor(Math.random() * this.randnums.length);
    let number = this.randnums[m];
    this.randnums.splice(m, 1);
    return number;
  }
}
