import { Component, OnInit, Input } from '@angular/core';
import { StocksDataService } from '../../../stocks-data.service';
import { stockPortfolio } from '../../model/stockPortfolio';
import { stock } from '../../model/stock';

@Component({
  selector: 'app-gain-loss-account',
  templateUrl: './gain-loss-account.component.html',
  styleUrls: ['./gain-loss-account.component.css']
})
export class GainLossAccountComponent implements OnInit {

  @Input()
  stock : stockPortfolio;

  constructor(private stocksDataService:StocksDataService) { }

  private getCurrentStockPrice(id: string){
    let prices: Array<stock>=[];
    let stocks = this.stocksDataService.stocks$;
    for (let key of Object.keys(stocks.value)){
      prices.push(stocks.value[key]);
    }
    return (((prices.filter(x=> x.id === id))[0]).stockPrice);
  }

  calcChg(s: stockPortfolio){
    let gain = ((((-1)*(s.totalBuyPrice))+s.totalSellPrice)+(this.getCurrentStockPrice(s.stockId)*s.amount)).toFixed(2);
    return (gain === '-0.00') ? '0.00' : gain;
  }
  
  ngOnInit() {
  }

}
