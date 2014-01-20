// Tower of Hanoi
//
// Same thing as tower-of-hanoi.js but using explicit stacks
// so it's state can be discovered at any given time
//
function TowerOfHanoi(totalDisks) {
  this.init(totalDisks);
}

TowerOfHanoi.prototype.init = function(totalDisks) {
  this.totalDisks = totalDisks;

  this.towers = [[], [], []];

  for (var i = totalDisks; i > 0; --i) {
    this.towers[0].push(i);
  };
};

TowerOfHanoi.prototype.solve = function(totalDisks, fromTower, toTower) {
  this.towers = [[], [], [3, 2, 1]];
};


// --------------------------------------
// -------------- Tests -----------------
// --------------------------------------
function assert(truthiness, msg) {
  if (!truthiness) {
    throw new Error("Fail! => " + msg);
  }
}

function assertArrayEquals(arr1, arr2, msg) {
  var result = arr1.length === arr2.length;

  if (result) {
    for (var i = 0; i < arr1.length; ++i) {
      // nested arrays deep compare
      if (Object.prototype.toString.apply(arr1[i]) === "[object Array]") {
        result &= assertArrayEquals(arr1[i], arr2[i], msg);
      }
      else if (arr1[i] !== arr2[i]) {
        result = false;
        break;
      }
    }
  }

  try {
    assert(result, msg);
    return true;
  } catch(e) {
    throw e;
  }
}

var tower;

// Test 1
tower = new TowerOfHanoi(3);
assert(tower.totalDisks === 3, "expect tower to have 3 disks");
assertArrayEquals(tower.towers[0], [3, 2, 1], "expect tower to create all disks with different sizes given its input");

// Test 2
assertArrayEquals([[2, 6, [1, 2, 37], 12]], [[2, 6, [1, 2, 37], 12]], "array deep compare");

// Test 3
tower = new TowerOfHanoi(3);
tower.solve();
assertArrayEquals(tower.towers, [[], [], [3, 2, 1]], "#solve() solves the puzzle by moving all disks from tower 1 to tower 3");

// Test 4

console.log("success!");



