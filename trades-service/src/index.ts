import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { SystemController } from "./controllers/system.controller";
import { TradeController } from "./controllers/trade.controller";
import config from './config';

const app = createExpressServer({
  cors: true,
  controllers: [SystemController, TradeController]
});

app.listen(config['port']);