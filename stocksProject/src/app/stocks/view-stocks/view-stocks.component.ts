import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { stock } from '../../model/stock';
import { StocksDataService } from '../../../stocks-data.service';
import { Router } from '@angular/router';
import { stockPortfolio } from '../../model/stockPortfolio';

@Component({
  selector: 'app-view-stocks',
  templateUrl: './view-stocks.component.html',
  styleUrls: ['./view-stocks.component.css']
})
export class ViewStocksComponent implements OnInit {

  stocks : Observable<Array<stock>>;
  portfolio : BehaviorSubject<Array<any>>=new BehaviorSubject<Array<any>>([]);
  aggregateStocks: Array<stockPortfolio>=[];

  constructor(private stocksDataService:StocksDataService, private router: Router) {
    this.stocks = this.stocksDataService.stocks$;
    this.portfolio = this.stocksDataService.portfolio$;

    this.stocks.subscribe(result =>{
      if (result.length === 0)
      this.router.navigate(['/', 'error']);
    })
  }

  calcChg(stock: stock){
    return (stock.stockPrice-stock.openedPrice).toFixed(2);
  }

  calcPercent(stock: stock){
    return (((stock.stockPrice/stock.openedPrice)*100)-100).toFixed(2);
  }

  checkAmount(stock:stock){
    for (let key of Object.keys(this.portfolio.value)){
      this.aggregateStocks.push(this.portfolio.value[key]);
    }
    return (this.aggregateStocks.filter(x=> x.stockId === stock.id).map(y=> y.amount)[0]>0);
  }

  buyStock(stock: stock){
    this.router.navigate(['/', 'viewStocks', stock.stockName, 'buy']);
  }

  sellStock(stock: stock){
    this.router.navigate(['/', 'viewStocks', stock.stockName, 'sell']);
  }

  getPrice(s: stock){
    return s.stockPrice.toFixed(4);
  }

  ngOnInit() {
  }

}
