# Knuth Shuffle
# Complexity: O(n)
#
# The idea is to iterate over an array and exchange each element in position i
# to a random position from 0 up to i

from random import randrange

def shuffle(array):
  for i in range(1, len(array)):
    # removing the +1 of randrange seems to garantee a perfect shuffle
    random_index = randrange(0, i + 1)
    temp = array[i]
    array[i] = array[random_index]
    array[random_index] = temp

  return array


print shuffle(range(0, 20))
