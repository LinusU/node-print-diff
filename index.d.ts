declare interface Output {
  write (data: string): void
}

export function printInlineDiff (actual: string, expected: string, out?: Output): void
export function printUnifiedDiff (actual: string, expected: string, out?: Output): void
