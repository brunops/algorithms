def quicksort(ary, size)
end

def assert(obj)
  raise "fail" unless obj
end

if $0 == __FILE__
  assert(quicksort([1, 3, 2], 3) == [1, 2, 3])
end
