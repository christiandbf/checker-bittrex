const bittrex = require('node-bittrex-api')
const EventEmitter = require('events')

class SummariesGetter extends EventEmitter {
  constructor(period) {
    super()
  }

  get() {
    bittrex.getmarketsummaries((data, err) => {
      if (err) {
        this.emit('error', err.message)
      } else if (!err && data.success) {
        let now = Date.now()
        let summaries = data.result.map((summary) => {
          summary.Now = now
          return summary
        })
        this.emit('summaries', summaries)
      }
    })
  }
}

module.exports = SummariesGetter