import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksHistoryComponent } from './stocks-history.component';

describe('StocksHistoryComponent', () => {
  let component: StocksHistoryComponent;
  let fixture: ComponentFixture<StocksHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
