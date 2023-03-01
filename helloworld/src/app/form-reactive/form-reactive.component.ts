import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.css'],
})
export class FormReactiveComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Anna', 'Henry'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    let control = new FormControl(null, [Validators.required]);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.includes(control.value)) {
      return {
        nameIsForbidden: true,
      };
    }

    return null;
  }
}
