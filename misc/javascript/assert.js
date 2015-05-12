require('colors');

function assert(truth, msg) {
  if (!truth) {
    throw new Error(('Fail: '.red) + (msg || '').yellow);
  }
  else {
    console.log(('Pass: '.green) + (msg || '').yellow);
  }
};

function deepEqual(actual, expected, msg) {
  var isEqual = true;

  if (actual.length !== expected.length) {
    assert(false, msg);
    return;
  }

  actual.forEach(function (el, i) {
    isEqual &= el === expected[i];
  });

  if (!isEqual) {
    msg += ('\nactual: ' + actual.toString()).bgRed.white.bold;
    msg += ('\nexpected: ' + expected.toString()).bgGreen.white.bold;
  }

  assert(isEqual, msg);
};

module.exports = function () {
  if (arguments.length === 3) {
    deepEqual.apply(null, arguments);
    return;
  }

  assert.apply(null, arguments);
};
