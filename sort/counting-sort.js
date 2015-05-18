function countingSort(list, minNum, maxNum) {
  var range = maxNum - minNum + 1,
      count = new Array(range);

  list.forEach(function (num) {
    count[num - minNum] = count[num - minNum] ? count[num - minNum] + 1 : 1;
  });

  curr = 0;
  for (var i = 0; i < count.length; ++i) {
    while (count[i] > 0) {
      list[curr++] = i + minNum;
      count[i]--;
    }
  }

  return list;
}


console.log(countingSort([5,3,1,1,5,3,4,3,1,1], 1, 5));


