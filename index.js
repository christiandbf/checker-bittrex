const SummariesGetter = require('./lib/SummariesGetter')
const Checker = require('./lib/Checker')

let controller = (args) => {
  let summariesGetter = new SummariesGetter()

  let checkers = args.checkers.map((opt) => new Checker(opt))

  checkers.forEach(checker => {
    summariesGetter.on('summaries', checker.check.bind(checker))
  })

  summariesGetter.on('summaries', function () {
    setTimeout(() => {
      this.get()
    }, args.period)
  })

  summariesGetter.on('error', args.error)

  summariesGetter.get()
}

module.exports = controller