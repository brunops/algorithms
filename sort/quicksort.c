#include <stdio.h>
#include <stdlib.h>

typedef struct array {
  int *data;
  size_t size;
} array;

void assert_array_sorted(array ary);
void print_array(array ary);
void quicksort(array ary, size_t low, size_t high);

int main() {
  int i;

  array a1;
  a1.size = 5;

  a1.data = malloc(a1.size * sizeof(int));
  for (i = 0; i < a1.size; i++) {
    a1.data[i] = a1.size - i;
  }

  quicksort(a1, 0, a1.size - 1);
  assert_array_sorted(a1);

  return 0;
}

void quicksort(array ary, size_t low, size_t high) {
  int i, j, pivot, pivot_index, temp;

  print_array(ary);

  // Base case
  if (low > high) {
    return;
  }

  // Define median element as pivot
  pivot_index = low + high / 2;
  pivot = ary.data[pivot_index];

  // Take pivot out of the way
  temp = ary.data[low];
  ary.data[low] = ary.data[pivot_index];
  ary.data[pivot_index] = temp;

  // Initialize control indices for partition
  i = low + 1;
  j = low + 1;

  // Partitionate
  while (j <= high) {
    if (ary.data[j] < pivot) {
      // Swap
      temp = ary.data[i];
      ary.data[i] = ary.data[j];
      ary.data[j] = temp;
      i++;
    }

    j++;
  }

  // Put pivot back in its correct place
  pivot_index = i - 1;
  temp = ary.data[low];
  ary.data[low] = ary.data[pivot_index];
  ary.data[pivot_index] = temp;


  print_array(ary);
}

void assert_array_sorted(array ary) {
  int i;

  for (i = 0; i < ary.size - 1; ++i) {
    if (ary.data[i] > ary.data[i + 1]) {
      printf("FAIL! Array is NOT sorted!");
      print_array(ary);
      exit(1);
    }
  }
}

void print_array(array ary) {
  int i;

  printf("\nArray of size %ld: ", ary.size);
  for (i = 0; i < ary.size; i++){
    printf("%d ", ary.data[i]);
  }
}
