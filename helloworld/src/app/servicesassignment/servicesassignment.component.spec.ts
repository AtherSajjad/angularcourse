import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesassignmentComponent } from './servicesassignment.component';

describe('ServicesassignmentComponent', () => {
  let component: ServicesassignmentComponent;
  let fixture: ComponentFixture<ServicesassignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesassignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
