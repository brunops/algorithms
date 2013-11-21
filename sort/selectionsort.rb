def bubblesort ary
  ary.each_with_index do |el, i|
    for j in ((i + 1)...(ary.length))
      if ary[i] > ary[j]
        ary[i], ary[j] = ary[j], ary[i]
      end
    end
  end
end

def assert obj
  raise "fail" unless obj
end

if $0 == __FILE__
  assert(bubblesort([4, -9, 5]) == [-9, 4, 5])
  assert(bubblesort([4, -9, 123, 33, 321, 9, 0, -90, 111]) == [-90, -9, 0, 4, 9, 33, 111, 123, 321])

  p "oh yeah!"
end
