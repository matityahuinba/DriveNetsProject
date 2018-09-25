import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySellStockComponent } from './buy-sell-stock.component';

describe('BuySellStockComponent', () => {
  let component: BuySellStockComponent;
  let fixture: ComponentFixture<BuySellStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuySellStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySellStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
