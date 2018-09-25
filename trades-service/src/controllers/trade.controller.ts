import { Param, Body, Get, Post, Delete, JsonController } from "routing-controllers";
import { TradeModel, TradeJson } from '../models/trade.model';
import { v4 as uuid } from 'uuid';
import * as rp from 'request-promise';
import config from '../config';

@JsonController('/trades')
export class TradeController {

  @Get()
  getAllTrades() {
    return TradeModel.findAll().map(s => s.toJSON()).catch(e=> {
      throw new Error(e)});
  }

  @Get('/portfolio')
  getPortfolio() {
    return this.getTradesByStock()
      .then(tradesByStock => {
        let portfolio = {};

        for (let stockId of Object.keys(tradesByStock)) {
          portfolio[stockId] = this.calculateStockDetails(tradesByStock[stockId])
        }
        return portfolio;
      });
  }

  @Get('/portfolio/:id')
  getStockDetails(@Param('id') stockId: string) {
    return TradeModel.findAll({ where: { stockId } })
      .map(s => s.toJSON())
      .then(tradesOfStock => this.calculateStockDetails(tradesOfStock));
  }

  getTradesByStock() {
    return this.getAllTrades()
      .then(trades => {
        let tradesByStock = {};

        for (let trade of trades) {
          if (tradesByStock[trade.stockId]) {
            tradesByStock[trade.stockId].push(trade);
          } else {
            tradesByStock[trade.stockId] = [trade];
          }
        }

        return tradesByStock;
      })
  }

  calculateStockDetails(stockTrades) {
    let details = {
      amount: 0,
      totalBuyPrice: 0,
      totalSellPrice: 0,
      numBuys: 0,
      numSells: 0,
      stockName: stockTrades[0].stockName,
      stockId: stockTrades[0].stockId
    };
    stockTrades.forEach(trade => {
      const isBuy = (trade.action === 'buy' ? 1 : 0);
      details.amount += trade.amount * (isBuy ? 1 : -1);
      details.totalBuyPrice += trade.amount * trade.stockPrice * isBuy;
      details.totalSellPrice += trade.amount * trade.stockPrice * (1 - isBuy);
      details.numBuys += isBuy;
      details.numSells += 1 - isBuy;
    });

    return details;
  }

  @Post('/buy')
  buy(@Body() trade: TradeJson) {
    return rp(config.stockServiceUrl + '/stocks/' + trade.stockId)
      .then(stock => {
        if (!stock) {
          throw new Error('Stock does not exist');
        }
        return this.addTrade(stock, trade, 'buy');
      })
  }

  @Post('/sell')
  async sell(@Body() trade: TradeJson) {
    const stock = await rp(config.stockServiceUrl + '/stocks/' + trade.stockId)
    if (!stock) {
      throw new Error('Stock does not exist');
    }
    const stockDetails = await this.getStockDetails(trade.stockId);
    if (trade.amount > stockDetails.amount) {
      throw new Error('Cannot sell amount=' + trade.amount + ' of stock=' + stock.id + ', maximum amount=' + stockDetails.amount);
    }
    return this.addTrade(stock, trade, 'sell');
  }
  /**
   * Saves a trade to the DB, assuming that the stock exists and that the trade is valid 
   */
  addTrade(stock, trade, action) {
    stock = JSON.parse(stock);
    (<any>Object).assign(trade, {
      action,
      id: uuid(),
      createdAt: undefined,
      updatedAt: undefined,
      stockId: stock.id,
      stockPrice: stock.stockPrice,
      stockName: stock.stockName
    });
    return TradeModel.create(trade).then(t => t ? t.toJSON() : t);
  }

  @Get("/:id")
  getTrade(@Param("id") id: string) {
    return TradeModel.findById(id).then(s => s ? s.toJSON() : s);
  }

  @Delete("/:id")
  removeTrade(@Param("id") id: string) {
    return TradeModel.destroy({
      where: { id }
    });
  }

}