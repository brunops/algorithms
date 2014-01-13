/**
 * Given a list of N coins, their values (V1, V2, ... , VN),
 * and the total sum S.
 *
 * Find the minimum number of coins the sum of which is S (we can use as many
 * coins of one type as we want), or report that it's not possible
 * to select coins in such a way that they sum up to S.
 *
 * Use Dynamic Programming
 */

function totalCoins(totalSum, coins) {
  // store perfect sum number of coins
  var coinsPerSum = {};
  coinsPerSum[0] = 0;

  for (var sum = 1; sum <= totalSum; sum++) {
    coinsPerSum[sum] = Infinity;
    for (var coin = 0; coin < coins.length; coin++) {
      if (coins[coin] <= sum && coinsPerSum[sum - coins[coin]] + 1 < coinsPerSum[sum]) {
        coinsPerSum[sum] = coinsPerSum[sum - coins[coin]] + 1;
      }
    }
  }

  return coinsPerSum[totalSum];
}

// Tests
function assert(truthiness) {
  if (!truthiness) {
    throw "fail"
  }
}

assert(totalCoins(0, [1, 3, 5]) === 0);
assert(totalCoins(1, [1, 3, 5]) === 1);
assert(totalCoins(3, [1, 3, 5]) === 1);
assert(totalCoins(4, [1, 3, 5]) === 2);
assert(totalCoins(5, [1, 3, 5]) === 1);
assert(totalCoins(6, [1, 3, 5]) === 2);
assert(totalCoins(7, [1, 3, 5]) === 3);
assert(totalCoins(8, [1, 3, 5]) === 2);
assert(totalCoins(9, [1, 3, 5]) === 3);
assert(totalCoins(10, [1, 3, 5]) === 2);
assert(totalCoins(11, [1, 3, 5]) === 3);

console.log('success!');
