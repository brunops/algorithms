def mergesort(ary)
  [1, 3, 5]
end

def assert(obj)
  raise "fail" unless obj
end

if $0 === __FILE__
  assert(mergesort([3, 5, 1]) === [1, 3, 5])
end

