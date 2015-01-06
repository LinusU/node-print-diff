
var colors = {
  added: 42,
  removed: 41
};

module.exports = function (color, string) {

  if (colors.hasOwnProperty(color) === false) {
    throw new Error('Unknown color: ' + color);
  }

  return '\u001b[' + colors[color] + 'm' + string + '\u001b[0m';
};
