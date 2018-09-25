import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GainLossAccountComponent } from './gain-loss-account.component';

describe('GainLossAccountComponent', () => {
  let component: GainLossAccountComponent;
  let fixture: ComponentFixture<GainLossAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GainLossAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GainLossAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
