import { diffWordsWithSpace } from 'diff'

import color from './color.js'

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

export default function printInlineDiff (actual, expected, out) {
  if (!out) { out = process.stderr }

  const list = diffWordsWithSpace(actual, expected)
  const str = legend() + list.map(rework).join('')
  const nl = (str[str.length - 1] === '\n')

  out.write((nl ? str : str + '\n') + '\n')
}
