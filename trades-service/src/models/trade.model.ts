import { Sequelize } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(config.dbConnectionOptions);

export class TradeJson {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  action: string;
  
  stockId: string;
  stockName: string;
  stockPrice: number;
  amount: number;
}

export const TradeModel = sequelize.define('trades', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  action: Sequelize.STRING,

  stockName : Sequelize.STRING,
  stockId : Sequelize.STRING,
  stockPrice: Sequelize.REAL,
  amount: Sequelize.REAL
})

sequelize.sync().catch(err => console.error(err));

