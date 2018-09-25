import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '../../node_modules/@angular/router';
import { ROUTES } from './app.routing';

import { AppComponent } from './app.component';
import { StocksModule } from './stocks/stocks.module';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';

import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    StocksModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    SocketIoModule.forRoot({url: environment.stocksService, options: {}})

  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
