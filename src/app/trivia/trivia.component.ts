import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimerService } from '../services/timer.service';

interface question {
  question: string;
  answers: string[];
}

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css'],
})
export class TriviaComponent implements OnInit, OnDestroy {
  questionsArray = [
    {
      question: 'De la ce vine abrevierea MES?',
      answers: [
        'Manufacturing Execution System',
        'Manufacturing Excellence Systems',
        'Manufacturing Engineering Software',
        'Monitoring Electrical Systems',
      ],
    },
    {
      question: 'De la ce vine abrevierea GHP?',
      answers: [
        'Good Handling Practices',
        'Generic Handshake Protocol',
        'Generic Host Process',
        'Generic Hardware Protocol',
      ],
    },
    {
      question: 'Ce inseamna trasabilitate?',
      answers: [
        'Caracteristica unui sistem de a asigura calitatea neconforma si regasirea istoricului partial a unei entitati.',
        'Proprietatea unui proiect de a nu avea un istoric ce poate fi verificat sau urmarit.',
        'Caracteristica unui sistem de asigurare a calității de a permite regăsirea istoricului, a utilizării sau a localizării unei entități prin identificari inregistrate',
        'Proprietatea unui server de a salva anumite informatii despre o entitate.',
      ],
    },
    {
      question: 'Ce inseamna MaMa?',
      answers: [
        'Metadata Analysis and Mining Application',
        'Management of Materials',
        'Manufacturing Materials',
        'Manufacturing Machine',
      ],
    },
    {
      question: 'Ce categorii de materiale se folosesc in productia din Sibiu?',
      answers: [
        'FIN, SEMI, PCB',
        'SEMI, MIN, PCB',
        'FIN, PCB, RAW',
        'RAW, SEMI, FIN',
      ],
    },
    {
      question: 'Ce inseamna CarMA?',
      answers: [
        'Carrier Manufacturing',
        'Car Manufacturing',
        'Carrier Materials',
        'Carrier Management',
      ],
    },
    {
      question: 'Care este definitia corecta pentru Interlocking?',
      answers: [
        'Funtionalitatea prin care se asigura impahetarea pieselor intr-un mod organizat pe liniile de productie',
        'Functionlitatea de blocare a pieselor in echipamentele de productie',
        'Funtionalitatea MES prin care se asigura o lista de pasi pentru procesul de productie',
        'Functionalite MES prin care se asigura parcurgerea unor pasi definiti intr-o anumita ordine in procesul de fabricare',
      ],
    },
    {
      question:
        'Care modul se ocupa cu salvarea datelor trimise de echipamentele din productie?',
      answers: ['EMAC', 'WIP', 'EVAPROD', 'Analize & Rework'],
    },
    {
      question:
        'Incalcarea caror reguli conduce la blocarea echipamentelor in MPM?',
      answers: [
        'Incalcarea regulilor MES',
        'Incalcarea regulilor IT',
        'Incalcarea regulilor Jidoka',
        'Incalcarea regulilor Pulse',
      ],
    },
    {
      question: 'Un multiboard este valid din punct de vedere MES atunci cand:',
      answers: [
        'Contine PCB-uri PASS si FAIL',
        'Contine doar PCB-uri PASS',
        'Contine doar PCB-uri FAIL',
        'Contine PCB-uri PASS si SCRAP',
      ],
    },
    {
      question: 'Ce inseamna SMT?',
      answers: [
        'Statical Machine Translation',
        'Smart Manufacturing Technologies',
        'Software Manufacturing Tools',
        'Surface-Mount Technology',
      ],
    },
    {
      question: 'Ce reprezinta un material de tip RAW?',
      answers: [
        'Reprezinta materia prima folosita pentru obtinerea celorlalte materiale produse intern',
        'Reprezinta materia semifinita obtinuta in interiorul fabricii.',
        'Reprezinta materialele ce vor fi livrate catre client',
        'Reprezinta materia care nu poate fi folosita in interiorul fabricii.',
      ],
    },
    {
      question: 'Ce reprezinta un material de tip SEMI?',
      answers: [
        'Reprezinta materia prima folosita pentru obtinerea celorlalte materiale produse intern',
        'Reprezinta materia semifinita obtinuta in interiorul fabricii din materiale RAW sau din alte materiale SEMI',
        'Reprezinta materialele ce vor fi livrate catre client',
        'Reprezinta materia care nu poate fi folosita in interiorul fabricii',
      ],
    },
    {
      question: 'Ce reprezinta un material de tip FIN',
      answers: [
        'Reprezinta materia prima folosita pentru obtinerea celorlalte materiale produse intern',
        'Reprezinta materia semifinita obtinuta in interiorul fabricii din materiale RAW sau din alte materiale SEMI.',
        'Reprezinta materialele ce vor fi livrate catre client.',
        'Reprezinta materia care nu poate fi folosita in interiorul fabricii.',
      ],
    },
  ];

  randnums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  question1!: question;
  question2!: question;
  question3!: question;
  question4!: question;
  question5!: question;

  constructor(public timerService: TimerService) {}

  ngOnInit(): void {
    this.question1 = this.questionsArray[this.getRandomNumber()];
    this.question2 = this.questionsArray[this.getRandomNumber()];
    this.question3 = this.questionsArray[this.getRandomNumber()];
    this.question4 = this.questionsArray[this.getRandomNumber()];
    this.question5 = this.questionsArray[this.getRandomNumber()];
    this.timerService.resetAll();
    this.timerService.initialTime = 120;
    this.timerService.startTimer();
  }

  ngOnDestroy(): void {
    this.timerService.pauseTimer();
    this.timerService.resetAll();
  }

  getRandomNumber() {
    let m = Math.floor(Math.random() * this.randnums.length);
    let number = this.randnums[m];
    this.randnums.splice(m, 1);
    return number;
  }
}
