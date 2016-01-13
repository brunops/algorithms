
function averagePrice(arr) {
  var totalBitcoin = 0,
      totalMoney = 0;

  arr.forEach(function (curr) {
    totalMoney += curr[0];
    totalBitcoin += curr[0] / curr[1];
  });

  return totalMoney / totalBitcoin;
}

if (require.main === module) {
  function assert(truthy) {
    if (!truthy) {
      throw new Error('fail');
    }
  }

  assert(averagePrice([[200, 245]]), 245);
  assert(averagePrice([[200, 245], [200, 255]]), 250);
  assert(averagePrice([[200, 200], [400, 200]]), 200);
  assert(averagePrice([[100, 200], [500, 200]]), 240);
}
