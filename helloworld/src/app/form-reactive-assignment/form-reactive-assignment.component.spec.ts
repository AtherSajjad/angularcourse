import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReactiveAssignmentComponent } from './form-reactive-assignment.component';

describe('FormReactiveAssignmentComponent', () => {
  let component: FormReactiveAssignmentComponent;
  let fixture: ComponentFixture<FormReactiveAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReactiveAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormReactiveAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
