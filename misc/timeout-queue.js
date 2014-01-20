var queue = [
  [function() { console.log('first'); }, 3500],
  [function() { console.log('second'); }, 1000],
  [function() { console.log('third'); }, 1000],
  [function() { console.log('fourth'); }, 1000],
  [function() { console.log('fifthy'); }, 1000]
];

function processQueue(queue) {
  var item = queue.shift();

  setTimeout((function recurr(item) {
    return function() {
      item[0]();
      item = queue.shift();

      if (item) {
        setTimeout(recurr(item), item[1]);
      }
    }
  })(item), item[1]);
}

processQueue(queue);


