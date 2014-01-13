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

function totalCoins(sum, coins) {
  return 0;
}

// Tests
function assert(truthiness) {
  if (!truthiness) {
    throw "fail"
  }
}
assert(totalCoins(0, [1, 3, 5]) === 0);
console.log('success!');
