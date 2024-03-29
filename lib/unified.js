import { createPatch } from 'diff'

import color from './color.js'

function legend () {
  return (
    '\n' +
    color('added', '+ expected') + ' ' +
    color('removed', '- actual') + '\n' +
    '\n'
  )
}

function rework (line) {
  switch (line[0]) {
    case '+': return color('added', line)
    case '-': return color('removed', line)
    case ' ': return line
    case '@': return null
    case '\\': return null
  }
}

function notNull (line) {
  return line !== null
}

export default function printUnifiedDiff (actual, expected, out) {
  if (!out) { out = process.stderr }

  const patch = createPatch('string', actual, expected)
  const lines = patch.split('\n').slice(4).map(rework).filter(notNull)

  out.write(legend() + lines.join('\n') + '\n')
}
