class Checker {
  constructor(args) {
    console.log('Creating checker')
    this._summaries = null
    this._name = args.name
    this._condition = args.condition
    this._updateConstraint = args.updateConstraint
    this._do = args.do
  }

  check(summaries) {
    console.log('Checking new summaries')
    if (!this._summaries) {
      this._summaries = summaries
    } else {
      let result = []
      let newSummaries = []
      this._summaries.forEach((lastSummary, index) => {
        let currentSummary = summaries[index]
        if (this._condition(lastSummary, currentSummary)) result.push([lastSummary, currentSummary])
        newSummaries.push(this._updateConstraint(lastSummary, currentSummary))
      })
      this._summaries = newSummaries
      if (result.length > 0) this._do({result, name: this._name})
    }
  }
}

module.exports = Checker
