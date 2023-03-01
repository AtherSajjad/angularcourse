import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-reactive-assignment',
  templateUrl: './form-reactive-assignment.component.html',
  styleUrls: ['./form-reactive-assignment.component.css'],
})
export class FormReactiveAssignmentComponent implements OnInit {
  projectForm: FormGroup;
  status: string[] = ['Stable', 'Critical', 'Finished'];

  forbiddenProjectNames = ['test'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      name: new FormControl(
        null,
        [Validators.required],
        [this.validateProjectNameAsync.bind(this)]
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(this.status[0]),
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  validateProjectName(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectNames.includes(control.value)) {
      return { isForbiddenName: true };
    }
    return null;
  }

  validateProjectNameAsync(
    control: FormControl
  ): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      if (this.forbiddenProjectNames.includes(control.value)) {
        resolve({ isForbiddenName: true });
      }

      resolve(null);
    });
  }
}
