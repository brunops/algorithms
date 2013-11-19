def insertion_sort array
  for i in 1...(array.length)
    key = array[i]
    j = i - 1

    while j >= 0 && array[j] > key
      array[j + 1] = array[j]
      j -= 1
    end

    array[j + 1] = key
  end

  array
end

def assert obj
  raise "fail" unless obj
end

if $0 == __FILE__
  assert(insertion_sort([8, 3, 1]) == [1, 3, 8])
  assert(insertion_sort([8, 3, 1, 10, 55, 123, 3, -1]) == [-1, 1, 3, 3, 8, 10, 55, 123])

  puts "yeah!"
end
