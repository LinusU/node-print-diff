const inline = require('./lib/inline')
const unified = require('./lib/unified')

function printDiff (actual, expected, out) {
  unified.apply(this, arguments)
}

printDiff.inline = inline
printDiff.unified = unified

module.exports = printDiff
