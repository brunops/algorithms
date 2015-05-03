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
    self.size = size
    self.ids = range(size)
    self.total_tree_nodes = [1] * size

  # unite p and q by making p a child of q
  # Trees are weighted
  # always  make the smaller tree be the child of the bigger tree to keep them short
  def union(self, p, q):
    p_root = self.root(p)
    q_root = self.root(q)
    
    # already in the same tree
    if p_root == q_root:
      return
    
    # first tree is smaller than second tree
    if self.total_tree_nodes[p_root] < self.total_tree_nodes[q_root]:
      self.ids[p_root] = q_root
      self.total_tree_nodes[q_root] += self.total_tree_nodes[p_root]

    # second tree smaller than first or they have the same size
    else:
      self.ids[q_root] = p_root
      self.total_tree_nodes[p_root] += self.total_tree_nodes[q_root]
  
  def root(self, q):
    parent = self.ids[q]
    while parent != self.ids[parent]:
      parent = self.ids[parent]

    return parent

if __name__ == '__main__':
  # Tests
  size = 10
  qu = QuickUnion(size)

  assert(qu.size == size)
  assert(qu.ids == range(size))

  qu.union(3, 4)
  assert(qu.ids[4] == 3)
  assert(qu.root(4) == 3)

  # weighted trees
  qu.union(4, 5)
  assert(qu.root(5) == 3)


  print 'success!'

