import { Sequelize } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(config.dbConnectionOptions);

export class StockJson {
  openedPrice: number;
  stockPrice: number;
  id: string;
  stockName: string;
}

export const StockModel = sequelize.define('stocks', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  stockName : Sequelize.STRING,
  openedPrice: Sequelize.REAL,
  stockPrice: Sequelize.REAL
}, {
  timestamps: false
})

sequelize.sync().catch(err => console.error(err));