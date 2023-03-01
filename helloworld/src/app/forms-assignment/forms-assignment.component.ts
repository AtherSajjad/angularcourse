import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forms-assignment',
  templateUrl: './forms-assignment.component.html',
  styleUrls: ['./forms-assignment.component.css']
})
export class FormsAssignmentComponent {
  subscriptions: string[] = ['Basic', 'Advanced', 'Pro'];
  defaultSubscription = 'Advanced'

  onFormSubmit(form: NgForm){
    console.log(form.form.value);
  }
}
