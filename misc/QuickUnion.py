# Quick Union
# Connectivity algorithm that improves #union method from QuickFind to O(logn)
# It uses the same array as data structure, but now it represents many trees (a forest)
#   where the value of the id represents it's parent node and roots are represented by 
#   a node where its parent is itself
#
# The weighted Quick Union controls its speed by not letting big tree heights
#   this is achieved by always connecting the small tree as a child of the bigger tree

class QuickUnion:
  def __init__(self, size):
    self.ids = range(size)


if __name__ == '__main__':
  # Tests
  qu = QuickUnion(10)

  assert(qu.ids == range(10))

  print 'success!'

