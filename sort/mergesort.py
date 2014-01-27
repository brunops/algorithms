import math

def mergesort(ary):
  size = len(ary)
  # already sorted
  if size == 1:
    return ary

  middle = int(math.floor(size / 2))

  return merge(mergesort(ary[0:middle]), mergesort(ary[middle:size]))


# recursive merge for the lulz
def merge(a, b):
  # return the rest of the other array if one is empty
  if not a:
    return b
  if not b:
    return a

  if a[0] < b[0]:
    return [a[0]] + merge(a[1:len(a)], b)
  else:
    return [b[0]] + merge(a, b[1:len(b)])




print merge([1,2,30], [5, 6, 18])
print mergesort([23,42,34,234,5,5,6,8,65,7,34,45,4,7,8,8,453,0])
