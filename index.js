const SummariesGetter = require('./lib/SummariesGetter')
const Checker = require('./lib/Checker')

let controller = (args) => {
  let summariesGetter = new SummariesGetter(args.period)

  let checkers = args.checkers.map((opt) => new Checker(opt))

  checkers.forEach(checker => {
    summariesGetter.on('summaries', checker.check.bind(checker))
  })

}

module.exports = controller