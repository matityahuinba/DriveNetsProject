import { StocksModule } from './stocks.module';

describe('StocksModule', () => {
  let stocksModule: StocksModule;

  beforeEach(() => {
    stocksModule = new StocksModule();
  });

  it('should create an instance', () => {
    expect(stocksModule).toBeTruthy();
  });
});
