def quicksort(ary, low, high)
  p "--------------------------- starting with: "
  p "low: #{low}"
  p "high: #{high}"
  p ary
  # Base case
  return if high <= low

  # Choose pivot
  pivot_index = (high + low) / 2

  p "PIVOT => #{ary[pivot_index]}"

  # Take pivot out of the way
  ary[pivot_index], ary[low] = ary[low], ary[pivot_index]
  p ary
  puts

  # Start pointers
  i = low + 1
  j = low + 1

  # Partitionate
  while (j <= high)
    puts
    p "while with i: #{i} and j: #{j}"
    if ary[j] < ary[low]
      p "LESS! ary[#{j}]: #{ary[j]} ... pivot: #{ary[low]}"
      p "SWAP! i: #{i} and j: #{j}"
      # swap
      ary[j], ary[i] = ary[i], ary[j]
      i += 1
    end
    p ary

    j += 1
  end

  # Set pivot in the correct place
  new_pivot_index = i - 1
  ary[low], ary[new_pivot_index] = ary[new_pivot_index], ary[low]


  p "----- RESULT"
  p ary
  p "recursive call to partition 1: low: #{low}, high: #{new_pivot_index - 1}"
  p "recursive call to partition 2: low: #{new_pivot_index + 1}, high: #{high}"

  # Recurse through both partitions
  quicksort(ary, low, new_pivot_index - 1)
  quicksort(ary, new_pivot_index + 1, high)
end

def assert(obj)
  raise "fail" unless obj
end

if $0 == __FILE__
  ary = [1, 3, 4, 5, 7, 0]
  quicksort(ary, 0, 5)
  assert(ary == [0, 1, 3, 4, 5, 7])
end
