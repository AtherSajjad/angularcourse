import { Injectable } from "@angular/core";

@Injectable()
export class CounterService {
  activeToInActive: number = 0;
  inActiveToActive: number = 0;

  incrementActiveToInactive() {
    this.activeToInActive++;
  }

  incrementInActiveToActive() {
    this.inActiveToActive++;
  }
}
