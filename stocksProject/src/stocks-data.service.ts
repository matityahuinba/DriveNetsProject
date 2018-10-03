import { Injectable } from '@angular/core';
import { stock } from './app/model/stock';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Trade } from './app/model/trade';
import { environment } from './environments/environment';
import { stockPortfolio } from './app/model/stockPortfolio';
import { catchError } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StocksDataService {

  stocks$: BehaviorSubject<Array<stock>> = new BehaviorSubject<Array<stock>>([]);

  filteredStocks$ : BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  deals: Array<Trade> = [];
  deals$: BehaviorSubject<Array<Trade>> = new BehaviorSubject<Array<Trade>>([]);

  portfolio$: BehaviorSubject<Array<stockPortfolio>> = new BehaviorSubject<Array<stockPortfolio>>([]);

  prefixRequest : Subscription = null;

  constructor(private http: HttpClient, private socket: Socket, private router: Router) {

    this.getAllDeals().subscribe(x => {
      this.deals = x;
      this.deals$.next(x);
    },
      error => this.redirectToError())

    this.getAllStocks().subscribe(x => {
      this.stocks$.next(x);
    },
      error => this.redirectToError())


    this.getPortfolio().subscribe(x => {
      this.portfolio$.next(x);
    },
      error => this.redirectToError())

    socket.on('connect', data => {
      console.log('Connection!');
    });

    socket.on('stockUpdate', data => {
      this.stocks$.next(data.sort(function (a, b) {
        return a.stockName > b.stockName ? 1 : a.stockName < b.stockName ? -1 : 0
      }));
    });

  }

  getAllStocks(): Observable<Array<stock>> {
    return this.http.get<Array<stock>>(environment.stocksService + '/stocks').pipe(
      catchError(err => throwError(err)),
    );
  }

  getAllDeals(): Observable<Array<Trade>> {
    return this.http.get<Array<Trade>>(environment.tradesService + '/trades').pipe(
      catchError(e =>
        throwError(e))
    );
  }

  getPortfolio(): Observable<Array<any>> {
    return this.http.get<Array<any>>(environment.tradesService + '/trades/portfolio').pipe(
      catchError(e =>
        throwError(e))
    );

  }

  buyOrSell(d: Trade) {
    return this.http.post<Trade>(environment.tradesService + '/trades/'+d.action, d).toPromise().then(result => {
      if (result) {
        this.deals.push(result);
        this.deals$.next(this.deals);

        this.getPortfolio().subscribe(x => {
          this.portfolio$.next(x);
        })
      } 
      return result;
    }).catch(e=> console.log(e))
  }

  buyNewStock(d: Trade) {
    return this.buyOrSell(d);
  }

  sellStock(d: Trade) {       
    return this.buyOrSell(d);
  }

  async getStocksByPrefix(prefix: string, flag:string) {
    if (this.prefixRequest){
      this.prefixRequest.unsubscribe();
      this.prefixRequest = null;
    }
    if (flag === 'Buy'){
      this.prefixRequest = await this.http.get<Array<stock>>(environment.stocksService + '/stocks/prefix/'+prefix).subscribe(x=>{
        if(x){
          this.filteredStocks$.next(x);
          this.prefixRequest = null;
        }
       else{
        this.filteredStocks$.next([]);
        this.prefixRequest = null;
       }
      })
    }else{
      this.prefixRequest = await this.http.get<Array<stockPortfolio>>(environment.tradesService + '/trades/prefix/'+prefix).subscribe(x=>{
        if (x){
          this.filteredStocks$.next([x]);
          this.prefixRequest = null;
        }else{
          this.filteredStocks$.next([]);
          this.prefixRequest = null;
        }
      })
    }
    return this.prefixRequest;
  }

  updateStock(s: stock): Observable<any> {
    const url = `${environment.stocksService}/stocks/${s.id}`;
    return this.http.put<stock>(url, s).pipe(
      catchError(e =>
        throwError(e))
    );
  }

  redirectToError() {
    this.router.navigate(['/', 'error']);
  }
}
