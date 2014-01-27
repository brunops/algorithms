import random

def quicksort(ary, low = 0, high = 0):
  # high defaults to last item index
  if high == 0:
    high = len(ary) - 1

  if high <= low:
    return

  # randomly chose pivot
  pivot_index = random.randrange(low, high + 1)

  # take pivot out of the way
  temp = ary[pivot_index]
  ary[pivot_index] = ary[low]
  ary[low] = temp

  # Partitionate
  i = low + 1
  j = low + 1

  while j <= high:
    if ary[j] < ary[low]:
      temp = ary[i]
      ary[i] = ary[j]
      ary[j] = temp
      i += 1

    j += 1

  # put pivot back in its place
  new_pivot_index = i - 1
  temp = ary[new_pivot_index]
  ary[new_pivot_index] = ary[low]
  ary[low] = temp

  # recurse both sides
  quicksort(ary, low, new_pivot_index - 1)
  quicksort(ary, new_pivot_index + 1, high)

a = [4, 13, -7, 0, 34, 12]
quicksort(a)
print a
