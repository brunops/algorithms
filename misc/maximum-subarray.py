# Kadane's algorithm
# Return maximum continuos sum in an array
# Complexity O(n)
def maximum_subarray(A):
  max_so_far = max_ending_here = 0
  for x in A:
    max_ending_here = max(0, max_ending_here + x)
    max_so_far = max(max_so_far, max_ending_here)
  return max_so_far

print maximum_subarray([1,11,-10,20])
