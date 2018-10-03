import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StocksDataService } from '../../../stocks-data.service';
import { stock } from '../../model/stock';
import { ViewChild } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  filteredNames: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  request;

  @Output()
  chosenName: EventEmitter<string> = new EventEmitter();

  @Input()
  flag ?: string;

  constructor(private stocksService: StocksDataService) {
    
  }

  @ViewChild(MatAutocompleteTrigger) trigger;
  onSearchChange(prefix: string) {
    if (this.request) {
      clearTimeout(this.request);
      this.request = null;
    }
    this.request = setTimeout(() => {
      if (prefix.length !== 0) {
        this.stocksService.getStocksByPrefix(prefix, this.flag);
        this.trigger._onChange("");
        this.trigger.openPanel();
      } else {
        this.trigger.closePanel();
      }
      this.request = null;
    }, 300);
  }

  getName(name: string) {
    this.chosenName.emit(name);
  }

  ngOnInit() {
    if (this.flag === 'Buy'){
      this.stocksService.filteredStocks$.subscribe(x => this.filteredNames.next(x));
    }
    else {
      this.stocksService.filteredStocks$.pipe(map(x=> x.filter(y=> y.amount>0))).subscribe(x => this.filteredNames.next(x));
    }
  }

}
