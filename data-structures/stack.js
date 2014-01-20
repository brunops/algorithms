function assert(truthiness, msg) {
  if (!truthiness) {
    throw new Error("Failed: " + msg);
  }
}

function Stack() {
  this.init();
}

Stack.prototype.init = function() {
  this.items = [];
};

Stack.prototype.size = function() {
  return this.items.length;
};

Stack.prototype.push = function(item) {
  this.items.push(item);
};

Stack.prototype.peek = function() {
  return this.items[this.items.length - 1] || null;
};

Stack.prototype.pop = function() {
  return this.items.pop() || null;
};

// Tests
var stack = new Stack();
assert(stack.size() === 0, "stack starts empty");
assert(stack.peek() === null, "#peek returns null when stack is empty");
stack.push(5);
assert(stack.size() === 1, "#size of stack is 1 after pushing one item");
assert(stack.peek() === 5, "#peek() returns last pushed item");
assert(stack.peek() === 5, "#peek() does not remove the returned item");

stack.push(50);
assert(stack.size() === 2, "#push increases size of stack");
assert(stack.pop() === 50, "#pop() returns last pushed item");
assert(stack.size() === 1, "#pop() removes returned item");
assert(stack.pop() === 5, "#pop() returns last pushed item");
assert(stack.pop() === null, "#pop() returns null when stack is empty");

console.log('success!');


