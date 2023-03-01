import { Component, Input } from '@angular/core';

@Component({
  selector: 'server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent {
  @Input() element: {
    serverId: number;
    serverStatus: string;
  };

  constructor() {}

  getColor() {
    return this.element.serverStatus === 'online' ? 'green' : 'red';
  }
}
