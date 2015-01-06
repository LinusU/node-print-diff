
var assert = require('assert');
var stream = require('stream');

var printDiff = require('../');
var color = require('../lib/color');

var A = color.bind(null, 'added');
var R = color.bind(null, 'removed');

function streamToBuffer(stream, cb) {

  var chunks = [];

  stream.on('data', chunks.push.bind(chunks));
  stream.on('error', cb);

  stream.on('end', function () {
    cb(null, Buffer.concat(chunks));
  });

}

function compareStream(stream, result, cb) {

  streamToBuffer(stream, function (err, data) {

    assert.ifError(err);
    assert.equal(data.toString(), result);

    cb();
  });

  stream.end();

}

describe('printDiff.unified', function () {

  var result = (
    '\n' + A('+ expected') + ' ' + R('- actual') + '\n' +
    '\n' + ' Hello\n' + A('+world') + '\n' + R('-Linus') + '\n\n'
  );

  it('should print a diff', function (done) {

    var out = new stream.PassThrough();

    var actual = 'Hello\nLinus\n';
    var expected = 'Hello\nworld\n';

    printDiff.unified(actual, expected, out);
    compareStream(out, result, done);

  });

  it('should add trailing newline', function (done) {

    var out = new stream.PassThrough();

    var actual = 'Hello\nLinus';
    var expected = 'Hello\nworld';

    printDiff.unified(actual, expected, out);
    compareStream(out, result, done);

  });

});

describe('printDiff.inline', function () {

  var result = (
    '\n' + A('expected') + ' ' + R('actual') + '\n' +
    '\n' + A('Linus') + R('I') + ' said hello' + '\n\n'
  );

  it('should print a diff', function (done) {

    var out = new stream.PassThrough();

    var actual = 'I said hello\n';
    var expected = 'Linus said hello\n';

    printDiff.inline(actual, expected, out);
    compareStream(out, result, done);

  });

  it('should add trailing newline', function (done) {

    var out = new stream.PassThrough();

    var actual = 'I said hello';
    var expected = 'Linus said hello';

    printDiff.inline(actual, expected, out);
    compareStream(out, result, done);

  });

});
