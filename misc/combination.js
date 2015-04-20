var factorial = function (n) {
  var total = 1;

  while (n > 1) {
    total *= n;
    n -= 1;
  }

  return total;
};

var combination = function (listSize, combinationSize) {
  return (factorial(listSize) / (factorial(combinationSize) * (factorial(listSize - combinationSize))));
};

module.exports = combination;
