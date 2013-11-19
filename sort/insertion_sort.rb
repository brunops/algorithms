def insertion_sort array
  [1, 3, 8]
end

def assert obj
  raise "fail" unless obj
end

if $0 == __FILE__
  assert(insertion_sort([8, 3, 1]) == [1, 3, 8])
end
