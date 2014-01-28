import random

def quicksort(ary):
  size = len(ary)

  if size <= 1:
    return ary

  # randomly chose pivot
  pivot_index = random.randrange(0, size)

  # take pivot out of the way
  temp = ary[0]
  ary[0] = ary[pivot_index]
  ary[pivot_index] = temp

  # partitionate
  i = 1
  j = 1

  while j < size:
    if ary[j] < ary[0]:
      temp = ary[i]
      ary[i] = ary[j]
      ary[j] = temp
      i += 1

    j += 1

  return quicksort(ary[1:i]) + [ary[0]] + quicksort(ary[i:size])


print quicksort([0, -6, 12, 43, 78, 19, 77])
