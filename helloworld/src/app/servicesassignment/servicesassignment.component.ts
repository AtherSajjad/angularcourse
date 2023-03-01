import { Component, OnInit } from '@angular/core';
import { CounterService } from '../services/CounterService';

@Component({
  selector: 'app-servicesassignment',
  templateUrl: './servicesassignment.component.html',
  styleUrls: ['./servicesassignment.component.css'],
})
export class ServicesassignmentComponent implements OnInit {
  
  constructor(public counterService: CounterService) {

  }
  ngOnInit() {}
}
