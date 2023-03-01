import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/can-deactivate-service';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.server = this.serversService.getServer(
      parseInt(this.activatedRoute.snapshot.params['id'])
    );
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.allowEdit =
      this.activatedRoute.snapshot.queryParams['allowEdit'] === '1'
        ? true
        : false;

    this.activatedRoute.params.subscribe((nextParams) => {
      this.server = this.serversService.getServer(parseInt(nextParams['id']));
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });
    this.activatedRoute.queryParams.subscribe((nextQueryParams) => {});
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.allowEdit) {
      return true;
    }

    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    ) {
      return confirm('Do you want to discard the changes');
    } else {
      return true;
    }
  }
}
