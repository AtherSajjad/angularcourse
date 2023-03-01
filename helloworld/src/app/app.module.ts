import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { Assignment3Component } from './assignment3/assignment3.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { GameControlComponent } from './game-control/game-control.component';
import { OddComponent } from './odd/odd.component';
import { EvenComponent } from './even/even.component';
import { Assignment4Component } from './assignment4/assignment4.component';
import { ServicesassignmentComponent } from './servicesassignment/servicesassignment.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { FormsAssignmentComponent } from './forms-assignment/forms-assignment.component';
import { FormReactiveComponent } from './form-reactive/form-reactive.component';
import { FormReactiveAssignmentComponent } from './form-reactive-assignment/form-reactive-assignment.component';
import { PipesAssignmentComponent } from './pipes-assignment/pipes-assignment.component';
import { ReversePipe } from './reverse.pipe';
import { SortlistPipe } from './sortlist.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    Assignment3Component,
    CockpitComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent,
    Assignment4Component,
    ServicesassignmentComponent,
    InactiveUsersComponent,
    ActiveUsersComponent,
    FormsAssignmentComponent,
    FormReactiveComponent,
    FormReactiveAssignmentComponent,
    PipesAssignmentComponent,
    ReversePipe,
    SortlistPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
