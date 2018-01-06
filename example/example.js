const controller = require('../index')

controller({
  "period": 1000,
  "checkers": [
    {
      "name": 'test',
      "condition": (lastSummary, currentSummary) => currentSummary.MarketName === 'USDT-BTC',
      "update": (lastSummary, currentSummary) => currentSummary,
      "do": (data) => console.log(data.result[0].last)
    }
  ],
  "error": message => console.log(message)
})