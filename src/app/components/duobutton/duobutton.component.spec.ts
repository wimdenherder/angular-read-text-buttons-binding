import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuobuttonComponent } from './duobutton.component';

describe('DuobuttonComponent', () => {
  let component: DuobuttonComponent;
  let fixture: ComponentFixture<DuobuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuobuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
