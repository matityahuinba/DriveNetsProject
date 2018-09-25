export default {
  name: 'StockService',
  port: 10002,
  dbConnectionOptions: {
    host: 'localhost',
    port: 5432,
    database: 'stockmarket',
    username: 'postgres',
    password: 'Hog58687',
    dialect: 'postgres'
  }
}