
var config = require('./config');
var diff = require('diff');
var color = require('./color');

function legend() {
  return (
    '\n' +
    color('added', '+ ' + config.labels[0]) + ' ' +
    color('removed', '- ' + config.labels[1]) + '\n' +
    '\n'
  );
}

function rework(line) {
  switch (line[0]) {
    case '+': return color('added', line);
    case '-': return color('removed', line);
    case ' ': return line;
    case '@': return null;
    case '\\': return null;
  }
}

function notNull(line) {
  return line !== null;
}

function unified(actual, expected, out) {
  if (!out) { out = process.stderr; }

  var patch = diff.createPatch('string', actual, expected);
  var lines = patch.split('\n').slice(4).map(rework).filter(notNull);

  out.write(legend() + lines.join('\n') + '\n');
}

module.exports = unified;
