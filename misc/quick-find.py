# Quick find
# Dynamic Connectivity problem
# Use an Array as the data-structure to represent connectivity
#   Two object p and q are connected if their entries in the Array are the same
#
class QuickFind:
  def __init__(self, size):
    # initialize structure without any connections between objects
    self.ids = range(size)

  # In this implementation, p is updated and q is left alone (doesn't matter the other)
  def union(self, p, q):
    self.ids[p] = self.ids[q] 


# Tests
qf = QuickFind(10)

qf.union(4, 3)
assert(qf.ids == [0, 1, 2, 3, 3, 5, 6, 7, 8, 9])


print "success!"
