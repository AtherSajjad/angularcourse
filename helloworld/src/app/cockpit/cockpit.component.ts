import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent {
  serverName: string = '';
  @Output() onServerCreated = new EventEmitter<{
    serverId: number;
    serverName: string;
    serverStatus: string;
  }>();

  onAddNewServer() {
    let id = Math.floor(Math.random() * 100);
    this.onServerCreated.emit({
      serverId: id,
      serverName: this.serverName,
      serverStatus: id > 50 ? 'online' : 'offline',
    });
  }
}
