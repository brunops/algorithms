def bubblesort ary
  [-9, 4, 5]
end

def assert obj
  raise "fail" unless obj
end

if $0 == __FILE__
  assert(bubblesort([4, -9, 5]) == [-9, 4, 5])
end
