# print-diff

Prints a pretty diff of two strings.

## Installation

```sh
npm install --save print-diff
```

## Usage

```javascript
const printDiff = require('print-diff')

printDiff('Hello\nLinus', 'Hello\nworld')
```

![Output](/example-unified.png?raw=true)

---

```javascript
const printDiff = require('print-diff')

printDiff.inline('The quick pink fox', 'The quick brown fox')
```

![Output](/example-inline.png?raw=true)

## API

### `printDiff(actual, expected[, out])`

Prints a diff to writeable stream `out`. `out` defaults to `process.stderr`.

### `printDiff.unified(actual, expected[, out])`

Prints a unified diff (default).

### `printDiff.inline(actual, expected[, out])`

Prints an inline diff.

## License

MIT
