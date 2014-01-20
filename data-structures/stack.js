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
  return this.items[this.items.length - 1];
};

// Tests
var stack = new Stack();
stack.push(5);
assert(stack.size() === 1, "size of stack is 1 after pushing one item");
assert(stack.peek() === 5, "peek() returns last pushed item");
assert(stack.peek() === 5, "peek() does not remove the returned item");

console.log('success!');


