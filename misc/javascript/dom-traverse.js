var bfs = function (root, callback) {
  var i,
      current,
      queue = [root];

  if (!(root instanceof HTMLElement)) {
    throw new Error('`root` needs to be a HTMLElement');
  }
  if (callback && !(typeof callback === 'function')) {
    throw new Error('`callback` needs to be a Function');
  }

  while (queue.length > 0) {
    current = queue.shift();

    if (callback) {
      callback(current);
    }

    for (i = 0; i < current.children.length; ++i) {
      queue.push(current.children[i]);
    }
  }
};

// preorder
var dfs = function (root, callback) {
  var current,
      stack = [root];

  if (!(root instanceof HTMLElement)) {
    throw new Error('`root` needs to be a HTMLElement');
  }
  if (callback && !(typeof callback === 'function')) {
    throw new Error('`callback` needs to be a Function');
  }

  while (stack.length !== 0) {
    current = stack.pop();

    if (callback) {
      callback(current);
    }

    if (current !== root && current.nextElementSibling) {
      stack.push(current.nextElementSibling);
    }
    if (current.firstElementChild) {
      stack.push(current.firstElementChild);
    }
  }
};

var dfsRecur = function (root, callback) {
  var i;

  if (!(root instanceof HTMLElement)) {
    throw new Error('`root` needs to be a HTMLElement');
  }
  if (callback && !(typeof callback === 'function')) {
    throw new Error('`callback` needs to be a Function');
  }

  if (callback) {
    callback(root);
  }

  for (i = 0; i < root.children.length; ++i) {
    dfsRecur(root.children[i], callback);
  }
};

module.exports = {
  bfs: bfs,
  dfs: dfs,
  dfsRecur: dfsRecur
};
