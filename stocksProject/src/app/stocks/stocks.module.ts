import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksListComponent } from './stocks-list/stocks-list.component';
import { StocksHistoryComponent } from './stocks-history/stocks-history.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BuySellStockComponent } from './buy-sell-stock/buy-sell-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GainLossAccountComponent } from './gain-loss-account/gain-loss-account.component';
import { MatSelectModule } from '@angular/material/select';
import { ViewStocksComponent } from './view-stocks/view-stocks.component';
import { BuySellCurrentStockComponent } from './buy-sell-current-stock/buy-sell-current-stock.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule, MatAutocompleteModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent } from './main/main.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule
  ],
  exports: [StocksListComponent, StocksHistoryComponent, PortfolioComponent, BuySellStockComponent,GainLossAccountComponent, ViewStocksComponent, BuySellCurrentStockComponent,SideNavComponent, MainComponent, DialogComponent, ErrorPageComponent, AutocompleteComponent],
  declarations: [StocksListComponent, StocksHistoryComponent, PortfolioComponent, BuySellStockComponent, GainLossAccountComponent, ViewStocksComponent, BuySellCurrentStockComponent, SideNavComponent, MainComponent, DialogComponent, ErrorPageComponent, AutocompleteComponent],
  entryComponents: [DialogComponent]
})
export class StocksModule { }
