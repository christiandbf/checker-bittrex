# checker-bittrex

Module to check if a market on Bittrex exchange accomplish a given condition.

___

## Install

You only need to run the following command in your working folder

```npm install checker-bittrex -S```

## Getting started

```javascript
const checker-bittrex = require('checker-bittrex')

checker-bittrex({
  "period": 1000,  // Milliseconds - Time to wait to make a new request
  "checkers": [
    {
      "name": 'Current value less than previoues value',  // Name of the checker
      "condition": (lastSummary, currentSummary) => currentSummary.Last < lastSummary.Last,  // Condition to check
      "updateConstraint": (lastSummary, currentSummary) => currentSummary,  // Function decide which summary must be the last 
      "do": data => console.log(data)  // You receive the market summary here, you can use this data for anything you want
    },
    {
      "name": 'Dump',
      "condition": (lastSummary, currentSummary) => currentSummary.Last < (lastSummary.Last * 0.9),
      "updateConstraint": (lastSummary, currentSummary) => {
        if (currentSummary.last > lastSummary.last) {
          return currentSummary
        } else {
          return lastSummary
        }
      },
      "do": data => console.log(data)
    }
  ]
})
```  

The module make a request to the Bittrex exchange every period (mS) to receive the data of the all markets. Then you can define an array of checkers, the structure of a checker object is the following:

* "name": Name of the checker
* "condition": Condition to check against the summaries - You receive two summaries (last and current)
* "updateConstraint": Function to decide which summary must be the last - You receive two summaries (last and current)
* "do": You receive here the summaries who accomplish the condition

Structure of the summary received:

```javascript
{
  "MarketName" : "BTC-LTC",
  "High" : 0.01350000,
  "Low" : 0.01200000,
  "Volume" : 3833.97619253,
  "Last" : 0.01349998,
  "BaseVolume" : 47.03987026,
  "TimeStamp" : "2014-07-09T07:22:16.72",
  "Bid" : 0.01271001,
  "Ask" : 0.01291100,
  "OpenBuyOrders" : 45,
  "OpenSellOrders" : 45,
  "PrevDay" : 0.01229501,
  "Created" : "2014-02-13T00:00:00",
  "DisplayMarketName" : null
}
```
