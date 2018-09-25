const rp = require('request-promise');
const stockServiceUrl = 'http://localhost:10002';
const changeInterval = 5*1000; // 5 sec
var colors = require('colors');

rp(stockServiceUrl + '/stocks').then(allStocks => {
    allStocks = JSON.parse(allStocks);
    setInterval(() => {
        console.log('Updating stock prices:'.underline.bold);
        allStocks.forEach(stock => {
            let diff = Math.random()*4-2;
            let newValue = stock.stockPrice + diff <= 0.1 ? 0.1 : stock.stockPrice + diff;
            if (diff < 0) {
                console.log('\t'+ stock.stockName + ': ', (stock.stockPrice +' --> ' + newValue).red);
            } else {
                console.log('\t'+ stock.stockName + ': ', (stock.stockPrice +' --> ' + newValue).green);
            }
            rp.put({
                uri: stockServiceUrl + '/stocks/' + stock.id,
                body: {
                    stockPrice: newValue
                },
                json: true
            });
            stock.stockPrice = newValue;
        });
        console.log('');
    }, changeInterval)
})