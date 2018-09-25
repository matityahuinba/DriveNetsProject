import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { stockPortfolio } from '../../model/stockPortfolio';
import { StocksDataService } from '../../../stocks-data.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { stock } from '../../model/stock';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {

  aggregateStocks: Array<stockPortfolio>=[];

  constructor(private stockDataService: StocksDataService, private router: Router) { 
    this.stockDataService.portfolio$.subscribe((stocks : Array<any>) => { 
      for (let key of Object.keys(stocks)){
        if (stocks[key].amount>0){
        this.aggregateStocks.push(stocks[key]);
       }
      }
    })
    if (this.aggregateStocks.length===0){
      this.router.navigate(['/', 'error']);
    }
  }

  calcAvgPrice(s: stockPortfolio){
    return (s.totalBuyPrice/s.numBuys).toFixed(2);
  }

  getAmount(s: stockPortfolio){
    return (s.amount).toFixed(2);
  }

  ngOnInit() {
  }

}
