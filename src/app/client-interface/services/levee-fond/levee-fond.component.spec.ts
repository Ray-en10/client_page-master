import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeveeFondComponent } from './levee-fond.component';

describe('LeveeFondComponent', () => {
  let component: LeveeFondComponent;
  let fixture: ComponentFixture<LeveeFondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeveeFondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeveeFondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
