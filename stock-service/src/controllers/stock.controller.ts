import { Param, Body, Get, Post, Put, Delete, JsonController } from "routing-controllers";
import { StockModel, StockJson } from '../models/stock.model';
import { v4 as uuid } from 'uuid';

@JsonController('/stocks')
export class StockController {

  @Get()
  getAllStocks() {
    return StockModel.findAll().map(s => s.toJSON());
  }

  @Get("/:id")
  getStock(@Param("id") id: string) {
    return StockModel.findById(id).then(s => s ? s.toJSON() : s);
  }

  @Put("/:id")
  updateStockPrice(@Param("id") id: string,  @Body() stock: StockJson) {
    return StockModel.update(stock, { where: { id } })
      .then(() => this.getStock(id));
  }

  @Post()
  addStock(@Body() stock: StockJson) {
    
    return StockModel.findOne({
        where: { stockName: stock.stockName }
      }).then(foundStock => {
        if (foundStock) {
          throw new Error('Stock already exists');
        }
        stock.id = uuid();
        return StockModel.create(stock).then(s => s ? s.toJSON() : s);
      });
  }

  @Delete("/:id")
  removeStock(@Param("id") id: string) {
     return StockModel.destroy({
       where: {id}
     });
  }

}