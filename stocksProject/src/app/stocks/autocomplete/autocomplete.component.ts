import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StocksDataService } from '../../../stocks-data.service';
import { stock } from '../../model/stock';
import { ViewChild } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  filteredNames: BehaviorSubject<Array<stock>> = new BehaviorSubject<Array<stock>>([]);
  request;

  constructor(private stocksService: StocksDataService) {
    this.stocksService.filteredStocks$.subscribe(x=> this.filteredNames.next(x));
  }

  @ViewChild(MatAutocompleteTrigger) trigger;
  onSearchChange(prefix: string) {
    if (this.request){
      clearTimeout(this.request);
      this.request=null;
    }
    this.request = setTimeout(() => {
        if (prefix.length !== 0) {
          this.stocksService.getStocksByPrefix(prefix);
          this.trigger._onChange("");
          this.trigger.openPanel();
        } else {
          this.trigger.closePanel();
        }
        this.request = null;
    }, 300);
  }

  ngOnInit() {
  }

}
