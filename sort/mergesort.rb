def mergesort(ary)
  return ary if ary.length == 1

  left = mergesort(ary[0...(ary.length / 2)])
  right = mergesort(ary[(ary.length / 2)..-1])

  merge_arys left, right
end

def merge_arys(ary1, ary2)
  merged_arys = []

  while ary1.length > 0 || ary2.length > 0
    if ary1[0] && ary2[0]
      if ary1[0] <= ary2[0]
        merged_arys << ary1.shift
      else
        merged_arys << ary2.shift
      end
    elsif ary1[0]
      merged_arys << ary1.shift
    else
      merged_arys << ary2.shift
    end
  end
  
  merged_arys
end

def assert(obj)
  raise "fail" unless obj
end

if $0 === __FILE__
  assert(merge_arys([1, 7, 19], [5, 18, 22, 30]) == [1, 5, 7, 18, 19, 22, 30])
  assert(mergesort([3, 5, 1]) === [1, 3, 5])
  assert(mergesort([23,42,34,234,5,5,6,8,65,7,34,45,4,7,8,8,453,0]) == [0, 4, 5, 5, 6, 7, 7, 8, 8, 8, 23, 34, 34, 42, 45, 65, 234, 453])

  puts "yeah!"
end

