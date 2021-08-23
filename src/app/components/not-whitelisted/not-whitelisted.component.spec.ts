import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotWhitelistedComponent } from './not-whitelisted.component';

describe('NotWhitelistedComponent', () => {
  let component: NotWhitelistedComponent;
  let fixture: ComponentFixture<NotWhitelistedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotWhitelistedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotWhitelistedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
