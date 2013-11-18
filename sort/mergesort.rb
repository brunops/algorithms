def mergesort(ary)
  return ary if ary.length == 1
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
#  assert(mergesort([3, 5, 1]) === [1, 3, 5])

  puts "yeah!"
end

