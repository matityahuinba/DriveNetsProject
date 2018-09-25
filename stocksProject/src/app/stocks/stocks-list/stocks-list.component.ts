import { Component, OnInit } from '@angular/core';
import { stock } from '../../model/stock';
import { Observable } from 'rxjs';
import { StocksDataService } from '../../../stocks-data.service';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css']
})
export class StocksListComponent implements OnInit {

  stocks : Observable<Array<stock>>;

  constructor(private stocksDataService:StocksDataService) {
    this.stocks = this.stocksDataService.stocks$;
  }

  getPrice(s: stock){
    return s.stockPrice.toFixed(4);
  }
  
  ngOnInit() {
  }

}
