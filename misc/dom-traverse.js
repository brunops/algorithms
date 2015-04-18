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

module.exports = {
  bfs: bfs
};
