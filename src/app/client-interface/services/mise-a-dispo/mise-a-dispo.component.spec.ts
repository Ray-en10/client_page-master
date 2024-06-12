import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiseADispoComponent } from './mise-a-dispo.component';

describe('MiseADispoComponent', () => {
  let component: MiseADispoComponent;
  let fixture: ComponentFixture<MiseADispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiseADispoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiseADispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
