import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { Trade } from '../../model/trade';
import { Router, ActivatedRoute } from '@angular/router';
import { StocksDataService } from '../../../stocks-data.service';
import { stockPortfolio } from '../../model/stockPortfolio';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'

@Component({
  selector: 'app-buy-sell-current-stock',
  templateUrl: './buy-sell-current-stock.component.html',
  styleUrls: ['./buy-sell-current-stock.component.css']
})
export class BuySellCurrentStockComponent implements OnInit {

  form: FormGroup;
  t: Trade;

  selectedStock;
  selectedName: string;

  title: string;

  fb: FormBuilder = new FormBuilder();

  min = 1;

  amount = new FormControl('', [Validators.required, this.positiveAmount(this.min)]);

  max: number;

  constructor(private router: Router, private stockService: StocksDataService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {

    activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.selectedName = id;
   
      this.form = new FormGroup({
        name: new FormControl({value: this.selectedName, disabled: true}),
        price: new FormControl({disabled: true}), 
        amount: new FormControl('',  Validators.required)
      });
    });

    activatedRoute.params.subscribe(params => {
      const myTitle = params['buyOrSell'];
      if (myTitle === 'sell'){
        this.title = "Sell";
      }else{
        this.title = "Buy";
      }
    });

    this.stockService.stocks$.subscribe((stocks : Array<any>) => {
      this.selectedStock = stocks.find(s => s.stockName === this.selectedName);
      if (this.selectedStock) {
        this.findMaxAmount(this.selectedStock.id);
      }
    });
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

  calcMax(key: string){
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

  doSave() {
    if (this.title === 'Buy') {
      this.BuyStock();
    }
    else {
      this.SellStock();
    }
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

  SellStock() {
    this.doActionNeeded('sell');
  }

  async findMaxAmount(stockId: string) {
    if (this.title === 'Buy') {
      this.amount.setValidators(Validators.compose([Validators.required, this.positiveAmount(this.min)]));
    } else {
      this.max = await this.calcMax(stockId);
      this.amount.setValidators(Validators.compose([this.positiveAmount(this.min),this.maxValidator(this.max), Validators.required]));
    }
  }

  getErrorMessage() {
    return this.amount.hasError('required') ? 'You must enter an amount.' :
    this.amount.hasError('positiveAmount') ? 'Not valid. At least one stock needed.' :
    this.amount.hasError('maxValidator') ? 'Notice - the max amount is '+this.max : '';
  }

  ngOnInit() {
  }

}
