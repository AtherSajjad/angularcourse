import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipesAssignmentComponent } from './pipes-assignment.component';

describe('PipesAssignmentComponent', () => {
  let component: PipesAssignmentComponent;
  let fixture: ComponentFixture<PipesAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipesAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipesAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
