import { Component } from '@angular/core';
import { CounterService } from './services/CounterService';
import { UsersService } from './services/UsersService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService, CounterService]
})
export class AppComponent {
  title = 'My Angular App';
  name = 'Ather Sajjad';
}
