# generate all permutations for a given string
def permutations(string):
  if len(string) == 1:
    return [string]

  prev_permutations = permutations(string[:len(string) - 1])
  new_permutations = []

  for perm in prev_permutations:
    for i in range(0, len(perm) + 1):
      new_permutations.append(perm[:i] + string[-1] + perm[i:])

  return new_permutations

print permutations("a")
print permutations("ab")
print permutations("abc")
print permutations("abcd")
print permutations("abcde")
