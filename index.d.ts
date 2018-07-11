declare interface Output {
  write (data: string): void
}

interface PrintDiff {
  (actual: string, expected: string, out?: Output): void
  inline (actual: string, expected: string, out?: Output): void
  unified (actual: string, expected: string, out?: Output): void
}

declare const printDiff: PrintDiff

export = printDiff
