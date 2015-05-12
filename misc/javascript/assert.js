require('colors');

module.exports = function (truth, msg) {
  if (!truth) {
    throw new Error(('Fail: '.red) + (msg || '').yellow);
  }
  else {
    console.log(('Pass: '.green) + (msg || '').yellow);
  }
};
