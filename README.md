# checker-bittrex

Module to check if a market on Bittrex exchange accomplish a given condition. If you are interested in work in a module with more exchanges, please write me to my email: <christiandbf@hotmail.com>.

## Install

You only need to run the following command in your working folder.  

```npm install checker-bittrex -S```

## Getting started

The module make a request to the Bittrex exchange every period (mS) to receive the data of the all markets (/public/getmarketsummaries API endpoint). Then you can define a controller and an array of checkers with the conditions which you want to check, the structure of a controller is the following:

* "period": Time to wait before make another request.
* "checkers": Array of checker objects.
* "error": You define an error handler when the request is failed.

```javascript
const controller = require('checker-bittrex')

controller({
  "period": 1000,
  "checkers": [
    {
      "name": 'test',
      "condition": (lastSummary, currentSummary) => currentSummary.MarketName === 'USDT-BTC',
      "update": (lastSummary, currentSummary) => currentSummary,
      "do": (data) => console.log(data)
    },
    {
      "name": 'Is growing',
      "condition": (lastSummary, currentSummary) => currentSummary.Last > lastSummary.Last,
      "update": (lastSummary, currentSummary) => {
        if (currentSummary.Last > lastSummary.Last) {
          return currentSummary
        } else {
          return lastSummary
        }
      },
      "do": (data) => console.log(data)
    }
  ],
  "error": message => console.log(message)
})
```  

The structure of a checker object is the following:

* "name": This name is to identify the condition used to check in the data received in "do" method, because you can have an array of them.
* "condition": Condition to check against the summaries - You receive two summaries (last and current) to check.
* "update": Function to decide which summary must be the last - You receive two summaries (last and current) to decide.
* "do": You receive here the summaries who accomplish the condition, you can do whatever you want.

To check if the market accomplish a condition you need two summaries. Usually lastSummary is taken in a previous time than currentSummary, but you can decide which must be the lastSummary in a update method. 

The structure of the summary received in the functions condition and update is the following:

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
  "DisplayMarketName" : null,
  "Now": 1515206027114
}
```

The property "Now" is added to make comparison of time, it is the result of "now" method on "Date" module. Anyway you can see the [API](https://bittrex.com/Home/Api) of Bittrex, the endpoint is /public/getmarketsummaries.

The data received on the do method is the following:

```javascript
{
  "name": "test",
  "result": [
    {
      "last": {
        "MarketName": "USDT-BTC",
        "High": 17152.98899998,
        "Low": 14759.43200002,
        "Volume": 8613.52980774,
        "Last": 16750.00000002,
        "BaseVolume": 138098943.4545704,
        "TimeStamp": "2018-01-06T02:40:41.73",
        "Bid": 16760,
        "Ask": 16780,
        "OpenBuyOrders": 7335,
        "OpenSellOrders": 3938,
        "PrevDay": 15062.00100004,
        "Created": "2015-12-11T06:31:40.633",
        "Now": 1515206446737
      },
      "current": {
        "MarketName": "USDT-BTC",
        "High": 17152.98899998,
        "Low": 14759.43200002,
        "Volume": 8613.52980774,
        "Last": 16750.00000002,
        "BaseVolume": 138098943.4545704,
        "TimeStamp": "2018-01-06T02:40:41.73",
        "Bid": 16760,
        "Ask": 16780,
        "OpenBuyOrders": 7335,
        "OpenSellOrders": 3938,
        "PrevDay": 15062.00100004,
        "Created": "2015-12-11T06:31:40.633",
        "Now": 1515206448006
      }
    }
  ]
}
```

You recive the name of the condition and an array of the summaries that accomplish the condition.
