import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  servers: { serverId: number; serverName: string; serverStatus: string }[] = [
    {
      serverId: 1,
      serverName: 'Test',
      serverStatus: 'online',
    },
  ];

  constructor() {}

  onServerCreated(serverData: {
    serverId: number;
    serverName: string;
    serverStatus: string;
  }) {
    this.servers.push({
      serverId: serverData.serverId,
      serverName: serverData.serverName,
      serverStatus: serverData.serverStatus,
    });
  }
}
