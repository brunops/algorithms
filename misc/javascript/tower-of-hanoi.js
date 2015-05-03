// Tower of Hanoi
//
// Solve Tower of Hanoi problem recursively for a given tower of totalDisks n
// move the full tower from tower fromTower to tower toTower described by
// it's numbers 1, 2 and 3.
//
// The objective of the puzzle is to move the entire stack to another tower,
// obeying the following simple rules:
//  1. Only one disk can be moved at a time.
//  2. Each move consists of taking the upper disk from one of the stacks
//     and placing it on top of another stack i.e. a disk can only be moved
//     if it is the uppermost disk on a stack.
//  3. No disk may be placed on top of a smaller disk.
//
// INPUT:
//   int totalDisks - number os disks
//   int fromTower  - index of origin tower (from 1 to 3)
//   int toTower    - index of destination tower (from 1 to 3)
//
// OUTPUT:
//   String - describe each step of the solution
//
// EXAMPLE:
//  hanoi(3, 1, 3) => move 3 disks from tower 1 to tower 3
//
// Prints the following steps:
//  1 -> 3
//  1 -> 2
//  3 -> 2
//  1 -> 3
//  2 -> 1
//  2 -> 3
//  1 -> 3
//

function hanoi(totalDisks, fromTower, toTower) {
  // Base Case:
  if (totalDisks === 1) {
    // Moving only one disk the straightforward step
    return [fromTower, '->', toTower, '\n'].join(' ');
  }
  else {
    var helperTower = 6 - fromTower - toTower; // because 1 + 2 + 3 = 6

    // Otherwise there are more disks, so we need to solve the N - 1 subproblem
    // First, move the top disk to the helper tower
    var step1 = hanoi(totalDisks - 1, fromTower, helperTower);

    // Then, move the last disk to the destination tower (base case)
    var myStep = hanoi(1, fromTower, toTower);

    // Finally, solve the N - 1 subproblem again, moving the subtower from step 1
    // to the destination tower
    var step2 = hanoi(totalDisks - 1, helperTower, toTower);

    return step1 + myStep + step2;
  }
}

console.log(hanoi(1, 1, 2));
console.log(hanoi(3, 1, 3));
console.log(hanoi(4, 1, 3));

