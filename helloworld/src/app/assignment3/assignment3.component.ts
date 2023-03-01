import { Component } from '@angular/core';

@Component({
  selector: 'app-assignment3',
  templateUrl: './assignment3.component.html',
  styleUrls: ['./assignment3.component.css'],
})
export class Assignment3Component {
  showSecret = false;
  logs = [];
  onDisplayClicked() {
    this.logs.push('Button was clicked at' + new Date().toISOString());
    this.showSecret = !this.showSecret;
  }
}
