def bubblesort ary
  begin 
    swaped = false
    for i in 0...(ary.length - 1)
      j = i + 1
      if ary[i] > ary[j]
        ary[i], ary[j] = ary[j], ary[i]
        swaped = true
      end
    end
  end while swaped

  ary
end

def assert truthiness
  raise "houston we have a problem!" unless truthiness
end

if $0 == __FILE__
  assert(bubblesort([5, 7, 13, -2, 4]) == [-2, 4, 5, 7, 13])
  puts 'no probs'
end
