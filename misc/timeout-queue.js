var queue = [
  [function() { console.log('first'); }, 3500],
  [function() { console.log('second'); }, 1000],
  [function() { console.log('third'); }, 100],
  [function() { console.log('fourth'); }, 1000],
  [function() { console.log('fifthy'); }, 1000]
];

function processQueue(queue) {
  var item = queue.shift();

  if (item) {
    setTimeout(function() {
      item[0]();

      processQueue(queue);
    }, item[1]);
  }
}

processQueue(queue);


