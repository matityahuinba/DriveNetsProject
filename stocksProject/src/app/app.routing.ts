import { Route } from '@angular/router';
import { PortfolioComponent } from './stocks/portfolio/portfolio.component';
import { StocksHistoryComponent } from './stocks/stocks-history/stocks-history.component';
import { BuySellStockComponent } from './stocks/buy-sell-stock/buy-sell-stock.component';
import { ViewStocksComponent } from './stocks/view-stocks/view-stocks.component';
import { BuySellCurrentStockComponent } from './stocks/buy-sell-current-stock/buy-sell-current-stock.component';
import { ErrorPageComponent } from './stocks/error-page/error-page.component';

export const ROUTES: Route[] = [
    {
        path: 'portfolio', component: PortfolioComponent
    },
    {
        path: 'viewStocks', component: ViewStocksComponent
    },
    {
        path: 'history', component: StocksHistoryComponent
    },
    {
        path: 'buy/:id', component: BuySellStockComponent
    },
    {
        path: 'sell/:id', component: BuySellStockComponent
    },
    {
        path: 'viewStocks/:id/:buyOrSell', component: BuySellCurrentStockComponent
    },
    {
        path: 'viewStocks/:id/:buyOrSell', component: BuySellCurrentStockComponent
    },
    {
        path: 'error', component: ErrorPageComponent
    },
    {
        path: 'error/:isSell', component: ErrorPageComponent
    },
];