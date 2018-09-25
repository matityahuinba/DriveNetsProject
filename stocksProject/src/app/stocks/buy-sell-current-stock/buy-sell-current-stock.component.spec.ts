import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySellCurrentStockComponent } from './buy-sell-current-stock.component';

describe('BuySellCurrentStockComponent', () => {
  let component: BuySellCurrentStockComponent;
  let fixture: ComponentFixture<BuySellCurrentStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuySellCurrentStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySellCurrentStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
