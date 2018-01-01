const bittrex = require('node-bittrex-api')
const EventEmitter = require('events')

class SummariesGetter extends EventEmitter {
  constructor(period) {
    console.log('Creating summariesgetter')
    super()
    setInterval(() => {
      bittrex.getmarketsummaries((data, err) => {
        if (err) {
          console.log('Error receiving the summaries')
        } else if (!err && data.success) {
          console.log('New summaries')
          this.emit('summaries', data.result)
        }
      })
    }, period)
  }
}

module.exports = SummariesGetter