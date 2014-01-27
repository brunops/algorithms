def selectionsort(A):
  for i in range(len(A)):
    for j in range(i + 1, len(A)):
      if A[i] > A[j]:
        temp = A[i]
        A[i] = A[j]
        A[j] = temp
  
  return A


print selectionsort([3, 2, 5, 13, 0])
print selectionsort([-3, -2, 5, 163, 0])
print selectionsort([3, 2, 15, 413, 500])
print selectionsort([390, -52, 5, -13, 0])
