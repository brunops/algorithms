def bubblesort ary
end

def assert truthiness
  raise "houston we have a problem!" unless truthiness
end

if $0 == __FILE__
  assert(bubblesort([5, 7, 13, -2, 4]) == [-2, 4, 5, 7, 13])
  puts 'no probs'
end
