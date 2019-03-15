
var config = require('./lib/config');
var inline = require('./lib/inline');
var unified = require('./lib/unified');

function printDiff(actual, expected, out) {
  unified.apply(this, arguments);
}

printDiff.inline = inline;
printDiff.unified = unified;
printDiff.configure = function(newConfig) {
  if (newConfig && newConfig.labels) {
    config.labels = newConfig.labels;
  }

  return printDiff;
};

module.exports = printDiff;
