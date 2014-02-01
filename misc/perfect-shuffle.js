function perfectShuffle(array) {
  if (array.length <= 1) {
    return array;
  }

  var availablePositions = [],
      pos1,
      pos2,
      aux;

  for (var i = 0; i < array.length; ++i) {
    availablePositions[i] = i;
  }

  while (availablePositions.length > 1) {
    pos1 = availablePositions.splice(Math.floor(Math.random() * availablePositions.length), 1);
    pos2 = availablePositions.splice(Math.floor(Math.random() * availablePositions.length), 1);

    aux = array[pos1];
    array[pos1] = array[pos2];
    array[pos2] = aux;
  }

  // for odd length arrays, there'll be one position left
  if (availablePositions.length) {
    pos1 = availablePositions[0];

    while (pos1 === (pos2 = Math.floor(Math.random() * array.length)));

    aux = array[pos1];
    array[pos1] = array[pos2];
    array[pos2] = aux;
  }

  return array;
}

console.log(perfectShuffle([1]));
console.log(perfectShuffle([1, 2]));
console.log(perfectShuffle([1, 2, 3]));
console.log(perfectShuffle([1, 2, 3, 4]));
console.log(perfectShuffle([1, 2, 3, 4, 5]));


