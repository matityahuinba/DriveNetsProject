import { Component, OnInit, Input } from '@angular/core';
import { stock } from '../../model/stock';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '../../../../node_modules/@angular/forms';
import { StocksDataService } from '../../../stocks-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Trade } from '../../model/trade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stockPortfolio } from '../../model/stockPortfolio';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'


@Component({
  selector: 'app-buy-sell-stock',
  templateUrl: './buy-sell-stock.component.html',
  styleUrls: ['./buy-sell-stock.component.css']
})
export class BuySellStockComponent implements OnInit {

  form: FormGroup;
  t: Trade;

  selectedStock;
  selectedName: string ='';


  stocksForSelect: Array<string> = [];

  flag: string;
  price: number;

  title: string;

  fb: FormBuilder = new FormBuilder();

  min = 1;

  amount = new FormControl('', [Validators.required, this.positiveAmount(this.min)]);

  max: number;

  constructor(private router: Router, private stockService: StocksDataService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
    this.stocksForSelect = new Array<string>();
    this.form = this.fb.group({
      amount: ['', Validators.required],
      price: []
    });

    activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.title = id;
    });

    try{
      this.defineStocksToSelect();
    }catch(e){
        this.router.navigate(['/', 'error']);
    }
    if (this.stocksForSelect.length === 0){
      if (this.title === 'Buy'){
        this.router.navigate(['/', 'error']);
      }
      else{
        this.router.navigate(['/', 'error', 'sell']);
      }
    }
  }

  private maxValidator(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value > max)) {
        return { 'maxValidator': true };
      }
      return null;
    };
  }

  private positiveAmount(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value < min)) {
        return { 'positiveAmount': true };
      }
      return null;
    };
  }

  private calcMax(key: string){
    let aggregateStocks: Array<stockPortfolio>=[];
    let stockInPortfolio = this.stockService.portfolio$;
    for (let key of Object.keys(stockInPortfolio.value)){
      aggregateStocks.push(stockInPortfolio.value[key]);
    }
    if (aggregateStocks.filter(x=> x.stockId===key)[0]){
      return ((aggregateStocks.filter(x=> x.stockId===key)[0]).amount);
    }else{
      return 0;
    }
  }

  async findMaxAmount(stockId: string) {
    if (this.title === 'Buy') {
      this.amount.setValidators(Validators.compose([Validators.required, this.positiveAmount(this.min)]));
    } else {
      this.max = await this.calcMax(stockId);
      this.amount.setValidators(Validators.compose([this.positiveAmount(this.min),this.maxValidator(this.max), Validators.required]));
    }
  }

  private defineStocksToSelect() {
    if (this.title === 'Buy') {
       this.stockService.stocks$.pipe(map(arr => arr.map(o => o.stockName))).subscribe(x => { 
        for (let i = 0; i < x.length; i++) {
          this.stocksForSelect.push(x[i]);
        }
      });
    } else {  
      this.calcSellStocks();
    }
  }

  private calcSellStocks(){
    let aggregateStocks: Array<stockPortfolio>=[];
    this.stockService.portfolio$.subscribe((stocks : Array<any>) => { 
      for (let key of Object.keys(stocks)){
        if (stocks[key].amount>0){
        aggregateStocks.push(stocks[key]);
       }
      }
      aggregateStocks.map(y=> this.stocksForSelect.push(y.stockName));
    }, error => {throw new Error()})

  }

  openDialog(body: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '200px';
    dialogConfig.width = '200px';

    dialogConfig.data = {
      title: 'Confirmation',
      body: body
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
  }

  doSave() {
    if (this.title === 'Buy') {
      this.BuyStock();
    }
    else {
      this.SellStock();
    }
  }

   doActionNeeded(action: string){
    if (this.amount.valid) {
      this.t = new Trade();
      this.t.amount = this.amount.value;
      this.t.stockName = this.selectedName;
      this.t.stockId = this.selectedStock.id;
      this.t.action = action;
      if(action === 'buy'){
         this.stockService.buyNewStock(this.t).then((result)=>{
          if (result){
            this.openDialog('Stocks saved!');
            this.router.navigate(['/', 'history']);
          }
           else{
            this.router.navigate(['/', 'error']);
           }
        })
      }else{
         this.stockService.sellStock(this.t).then((result)=>{
          if (result){
            this.openDialog('Stocks sold!');
            this.router.navigate(['/', 'history']);
          }
           else{
            this.router.navigate(['/', 'error']);
           }
        })
      }
    }
  }

  BuyStock() {
    this.doActionNeeded('buy');
  }

  findCurrentPrice(stockName: string) {
    this.selectedName = stockName;
    this.stockService.stocks$.subscribe((stocks : Array<any>) => {
      this.selectedStock = stocks.find(s => s.stockName === this.selectedName);
    });

    this.max = 0;
    this.findMaxAmount(this.selectedStock.id);
  }

  SellStock() {
    this.doActionNeeded('sell');
  }

  getErrorMessage() {
    return this.amount.hasError('required') ? 'You must enter an amount.' :
    this.amount.hasError('positiveAmount') ? 'Not valid. At least one stock needed.' :
    this.amount.hasError('maxValidator') ? 'Notice - the max amount is '+this.max : '';
  }

  ngOnInit() {
  }

}
