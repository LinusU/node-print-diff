/* eslint-env mocha */

import assert from 'node:assert'
import stream from 'node:stream'
import getStream from 'get-stream'

import { printInlineDiff, printUnifiedDiff } from './index.js'
import color from './lib/color.js'

describe('printUnifiedDiff', function () {
  const result = (
    '\n' + color('added', '+ expected') + ' ' + color('removed', '- actual') + '\n' +
    '\n' + ' Hello\n' + color('removed', '-Linus') + '\n' + color('added', '+world') + '\n\n'
  )

  it('should print a diff', async () => {
    const out = new stream.PassThrough()

    const actual = 'Hello\nLinus\n'
    const expected = 'Hello\nworld\n'

    printUnifiedDiff(actual, expected, out)
    out.end()

    assert.strictEqual(await getStream(out), result)
  })

  it('should add trailing newline', async () => {
    const out = new stream.PassThrough()

    const actual = 'Hello\nLinus'
    const expected = 'Hello\nworld'

    printUnifiedDiff(actual, expected, out)
    out.end()

    assert.strictEqual(await getStream(out), result)
  })
})

describe('printInlineDiff', function () {
  const result = (
    '\n' + color('added', 'expected') + ' ' + color('removed', 'actual') + '\n' +
    '\n' + color('removed', 'I') + color('added', 'Linus') + ' said hello' + '\n\n'
  )

  it('should print a diff', async () => {
    const out = new stream.PassThrough()

    const actual = 'I said hello\n'
    const expected = 'Linus said hello\n'

    printInlineDiff(actual, expected, out)
    out.end()

    assert.strictEqual(await getStream(out), result)
  })

  it('should add trailing newline', async () => {
    const out = new stream.PassThrough()

    const actual = 'I said hello'
    const expected = 'Linus said hello'

    printInlineDiff(actual, expected, out)
    out.end()

    assert.strictEqual(await getStream(out), result)
  })
})
