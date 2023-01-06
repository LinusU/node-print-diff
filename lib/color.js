const colors = {
  added: 42,
  removed: 41
}

export default function colorize (color, string) {
  if (color in colors) {
    return `\u001b[${colors[color]}m${string}\u001b[0m`
  } else {
    throw new Error(`Unknown color: ${color}`)
  }
}
