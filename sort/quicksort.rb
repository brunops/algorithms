def quicksort(ary, low = 0, high = ary.length - 1)
  # Base case
  return if high <= low

  # Choose pivot
  pivot_index = (high + low) / 2

  # Take pivot out of the way
  ary[pivot_index], ary[low] = ary[low], ary[pivot_index]

  # Start pointers
  i = low + 1
  j = low + 1

  # Partitionate
  while (j <= high)
    if ary[j] < ary[low]
      # swap
      ary[j], ary[i] = ary[i], ary[j]
      i += 1
    end

    j += 1
  end

  # Set pivot in the correct place
  new_pivot_index = i - 1
  ary[low], ary[new_pivot_index] = ary[new_pivot_index], ary[low]

  # Recurse through both partitions
  quicksort(ary, low, new_pivot_index - 1)
  quicksort(ary, new_pivot_index + 1, high)
end

def assert(obj)
  raise "fail" unless obj
end

if $0 == __FILE__
  ary = []
  quicksort(ary)
  assert(ary == [])

  ary = [70, 2, 7, 4, 5]
  quicksort(ary)
  assert(ary == [2, 4, 5, 7, 70])

  ary = [1]
  quicksort(ary)
  assert(ary == [1])

  ary = [1, 3, 4, 5, 7, 0]
  quicksort(ary)
  assert(ary == [0, 1, 3, 4, 5, 7])

  ary = [1, -3, 4, 5, 7, 0, 12, 444, 1900]
  quicksort(ary)
  assert(ary == [-3, 0, 1, 4, 5, 7, 12, 444, 1900])
end
