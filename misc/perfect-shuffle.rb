# Perfect shuffle
# 
# A shuffle where all the elements of an array are in a different place in the end
# 
def non_duplicate_shuffle(deck)
  available_positions = (0...(deck.length)).to_a

  while available_positions.length > 1
    index1 = available_positions.delete_at(rand(available_positions.length))
    index2 = available_positions.delete_at(rand(available_positions.length))

    deck[index1], deck[index2] = deck[index2], deck[index1]
  end

  # Shuffle the last element in case there is an odd number of elements
  if deck.length % 2 == 1
    begin
      last_shuffle_index = rand(deck.length)
    end while last_shuffle_index == available_positions[0]

    deck[available_positions[0]], deck[last_shuffle_index] = deck[last_shuffle_index], deck[available_positions[0]]
  end

  deck
end
