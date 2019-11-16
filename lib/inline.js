const diff = require('diff')
const color = require('./color')

function legend () {
  return (
    '\n' +
    color('added', 'expected') + ' ' +
    color('removed', 'actual') + '\n' +
    '\n'
  )
}

function rework (obj) {
  if (obj.added) return color('added', obj.value)
  if (obj.removed) return color('removed', obj.value)
  return obj.value
}

function inline (actual, expected, out) {
  if (!out) { out = process.stderr }

  const list = diff.diffWordsWithSpace(actual, expected)
  const str = legend() + list.map(rework).join('')
  const nl = (str[str.length - 1] === '\n')

  out.write((nl ? str : str + '\n') + '\n')
}

module.exports = inline
