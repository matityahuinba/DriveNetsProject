export default {
  name: 'TradeService',
  port: 10003,
  dbConnectionOptions: {
    host: 'localhost',
    port: 5432,
    database: 'stockmarket',
    username: 'postgres',
    password: 'Hog58687',
    dialect: 'postgres'
  },
  stockServiceUrl: 'http://localhost:10002' 
}