import { Component, OnInit } from '@angular/core';
import { Trade } from '../../model/trade';
import { StocksDataService } from '../../../stocks-data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-stocks-history',
  templateUrl: './stocks-history.component.html',
  styleUrls: ['./stocks-history.component.css']
})
export class StocksHistoryComponent implements OnInit {
   
  deals: Observable<Array<Trade>>;

  constructor(private stockDataService: StocksDataService, private router: Router) { 
    this.deals = this.stockDataService.deals$;

    this.deals.subscribe(result => {
      if (result.length===0)
        this.router.navigate(['/', 'error']);
     })
  }

  ngOnInit() {
  }

}
