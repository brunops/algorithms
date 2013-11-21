def selectionsort ary
  ary.each_with_index do |el, i|    
    min_number_index = i
    for j in ((i + 1)...(ary.length))
      if ary[j] < ary[min_number_index]
        min_number_index = j
      end
    end
    ary[i], ary[min_number_index] = ary[min_number_index], ary[i]
  end
end

def assert obj
  raise "fail" unless obj
end

if $0 == __FILE__
  assert(selectionsort([4, -9, 5]) == [-9, 4, 5])
  assert(selectionsort([4, -9, 123, 33, 321, 9, 0, -90, 111]) == [-90, -9, 0, 4, 9, 33, 111, 123, 321])

  p "oh yeah!"
end
