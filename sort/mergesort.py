# def mergesort(ary):


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
