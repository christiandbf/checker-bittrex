# Checker Bittex

Modulo para comprobar condiciones dadas en un mercado en Bittrex

```javascript
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
```