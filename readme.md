# print-diff

Prints a pretty diff of two strings.

## Installation

```sh
npm install --save print-diff
```

## Usage

```javascript
import { printUnifiedDiff } from 'print-diff'

printUnifiedDiff('Hello\nLinus', 'Hello\nworld')
```

![Output](/example-unified.png?raw=true)

---

```javascript
import { printInlineDiff } from 'print-diff'

printInlineDiff('The quick pink fox', 'The quick brown fox')
```

![Output](/example-inline.png?raw=true)

## API

### `printUnifiedDiff(actual, expected[, out])`

Prints a unified diff.

### `printInlineDiff(actual, expected[, out])`

Prints an inline diff.

## License

MIT
