import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent implements OnInit, OnDestroy {
  number: number = 0;
  interval: any;

  @Output() numberGenerator = new EventEmitter<Number>();
  
  stopGame() {
    clearInterval(this.interval);
  }

  startGame() {
    this.interval = setInterval(() => {
      this.number = this.number + 1;
      this.numberGenerator.emit(this.number);
    }, 1000);
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    
  }
}
