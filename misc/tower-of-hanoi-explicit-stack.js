// Tower of Hanoi
//
// Same thing as tower-of-hanoi.js but using explicit stacks
// so it's state can be discovered at any given time
//
function assert(truthiness, msg) {
  if (!truthiness) {
    throw new Error("Fail! => " + msg);
  }
}

function assertArrayEquals(arr1, arr2, msg) {
  var result = arr1.length === arr2.length;

  if (result) {
    for (var i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) {
        result = false;
        break;
      }
    }
  }

  return result;
}

function TowerOfHanoi(totalDisks) {
  this.init(totalDisks);
}

TowerOfHanoi.prototype.init = function(totalDisks) {
  this.towers = [[], [], []];

  for (var i = 1; i <= totalDisks; ++i) {
    this.towers[0].push(i);
  };
};

// Tests
var tower = new TowerOfHanoi(3);

assertArrayEquals(tower.towers[0], [1, 2, 3]);

console.log("success!");
