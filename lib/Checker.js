class Checker {
  constructor(args) {
    this._summaries = null
    this._name = args.name
    this._condition = args.condition
    this._update = args.update
    this._do = args.do
  }

  check(summaries) {
    if (!this._summaries) {
      this._summaries = summaries
    } else {
      let result = []
      let newSummaries = []
      this._summaries.forEach((lastSummary) => {
        let currentSummary = summaries.find((summary) => summary.MarketName == lastSummary.MarketName)
        if (this._condition(lastSummary, currentSummary)) result.push({ "last": lastSummary, "current": currentSummary})
        newSummaries.push(this._update(lastSummary, currentSummary))
      })
      this._summaries = newSummaries
      if (result.length > 0) this._do({name: this._name, result})
    }
  }
}

module.exports = Checker
