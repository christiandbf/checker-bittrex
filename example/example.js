const controller = require('../index')

controller({
  "period": 1000,
  "checkers": [
    {
      "name": 'Bitcoin',
      "condition": (lastSummary, currentSummary) => currentSummary.MarketName == 'USDT-BTC',
      "updateConstraint": (lastSummary, currentSummary) => currentSummary,
      "do": data => console.log(data)
    },
    {
      "name": 'Bitcoin Cash',
      "condition": (lastSummary, currentSummary) => currentSummary.MarketName == 'USDT-BCC',
      "updateConstraint": (lastSummary, currentSummary) => currentSummary,
      "do": data => console.log(data)
    }
  ]
})