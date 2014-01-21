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

TowerOfHanoi.prototype.getSolutionSteps = function() {
  var solutionSteps = this.hanoiSteps(this.totalDisks, 1, 3);

  // reset it
  this.init(this.totalDisks);

  return [this.towersDeepClone()].concat(solutionSteps);
};

TowerOfHanoi.prototype.hanoiSteps = function(totalDisks, fromTower, toTower) {
  // Base case
  // only one disk, just move it
  if (totalDisks === 1) {
    this.towers[toTower - 1].push(this.towers[fromTower - 1].pop());

    return [this.towersDeepClone()];
  }
  // Solve N-1 Subproblem
  else {
    var helperTower = 6 - fromTower - toTower; // because 1 + 2 + 3 === 6

    var step1 = this.hanoiSteps(totalDisks - 1, fromTower, helperTower);

    var myStep = this.hanoiSteps(1, fromTower, toTower);

    var step2 = this.hanoiSteps(totalDisks - 1, helperTower, toTower);


    return step1.concat(myStep).concat(step2);
  }
};

TowerOfHanoi.prototype.towersDeepClone = function() {
  var towersClone = [];

  for (var i = 0; i < this.towers.length; ++i) {
    towersClone.push(this.towers[i].slice(0));
  }

  return towersClone;
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

// Tests
var tower, solutionSteps;

var oneDiskSolutionSteps = [
  [ [1], [], [] ],
  [ [],  [], [1] ]
];

var twoDiskSolutionSteps = [
  [ [2, 1], [],  []     ],
  [ [2],    [1], []     ],
  [ [],     [1], [2]    ],
  [ [],     [],  [2, 1] ]
];

var threeDiskSolutionSteps = [
  [ [3, 2, 1], [],     []        ],
  [ [3, 2],    [],     [1]       ],
  [ [3],       [2],    [1]       ],
  [ [3],       [2, 1], []        ],
  [ [],        [2, 1], [3]       ],
  [ [1],       [2],    [3]       ],
  [ [1],       [],     [3, 2]    ],
  [ [],        [],     [3, 2, 1] ]
];

// Test 1
tower = new TowerOfHanoi(3);
assert(tower.totalDisks === 3, "expect tower to have 3 disks");
assertArrayEquals(tower.towers[0], [3, 2, 1], "expect tower to create all disks with different sizes given its input");

// Test 2
assertArrayEquals([[2, 6, [1, 2, 37], 12]], [[2, 6, [1, 2, 37], 12]], "array deep compare");

// Test 3
tower = new TowerOfHanoi(3);
tower.getSolutionSteps();
assertArrayEquals(tower.towers, [[3, 2, 1], [], []], "#getSolutionSteps() returns the state of the towers for each step of the solution but keeps towers intact");

// Test 4
tower = new TowerOfHanoi(1);
solutionSteps = tower.getSolutionSteps();
assertArrayEquals(solutionSteps, oneDiskSolutionSteps, "#getSolutionSteps returns the two steps for solution of a tower with one disk");

// Test 5
tower = new TowerOfHanoi(2);
solutionSteps = tower.getSolutionSteps();
assertArrayEquals(solutionSteps, twoDiskSolutionSteps, "#getSolutionSteps returns the four steps for solution of a tower with two disks");

// Test 6
tower = new TowerOfHanoi(3);
solutionSteps = tower.getSolutionSteps();
assertArrayEquals(solutionSteps, threeDiskSolutionSteps, "#getSolutionSteps returns the nine steps for solution of a tower with three disks");


console.log("success!");



