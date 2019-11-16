/* eslint-env mocha */

const assert = require('assert')
const stream = require('stream')
const getStream = require('get-stream')

const printDiff = require('./')
const color = require('./lib/color')

describe('printDiff.unified', function () {
  const result = (
    '\n' + color('added', '+ expected') + ' ' + color('removed', '- actual') + '\n' +
    '\n' + ' Hello\n' + color('removed', '-Linus') + '\n' + color('added', '+world') + '\n\n'
  )

  it('should print a diff', async () => {
    const out = new stream.PassThrough()

    const actual = 'Hello\nLinus\n'
    const expected = 'Hello\nworld\n'

    printDiff.unified(actual, expected, out)
    out.end()

    assert.strictEqual(await getStream(out), result)
  })

  it('should add trailing newline', async () => {
    const out = new stream.PassThrough()

    const actual = 'Hello\nLinus'
    const expected = 'Hello\nworld'

    printDiff.unified(actual, expected, out)
    out.end()

    assert.strictEqual(await getStream(out), result)
  })
})

describe('printDiff.inline', function () {
  const result = (
    '\n' + color('added', 'expected') + ' ' + color('removed', 'actual') + '\n' +
    '\n' + color('removed', 'I') + color('added', 'Linus') + ' said hello' + '\n\n'
  )

  it('should print a diff', async () => {
    const out = new stream.PassThrough()

    const actual = 'I said hello\n'
    const expected = 'Linus said hello\n'

    printDiff.inline(actual, expected, out)
    out.end()

    assert.strictEqual(await getStream(out), result)
  })

  it('should add trailing newline', async () => {
    const out = new stream.PassThrough()

    const actual = 'I said hello'
    const expected = 'Linus said hello'

    printDiff.inline(actual, expected, out)
    out.end()

    assert.strictEqual(await getStream(out), result)
  })
})
