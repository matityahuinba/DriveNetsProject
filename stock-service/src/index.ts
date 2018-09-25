import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { SystemController } from "./controllers/system.controller";
import { StockController } from "./controllers/stock.controller";
import config from './config';

const app = createExpressServer({
  cors: true,
  controllers: [SystemController, StockController]
});

const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(config['port']);

const ioStockController = new StockController();

io.on('connection', socket => {
  // console.log('New connection!');
  let interval = setInterval(() =>
    ioStockController.getAllStocks()
      .then(stocks => socket.volatile.emit('stockUpdate', stocks)), 5000);

  socket.on('disconnect', () => {
    console.log('Disconnect!');
    clearInterval(interval);
  })

});