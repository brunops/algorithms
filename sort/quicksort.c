#include <stdio.h>
#include <stdlib.h>
#include <time.h>

typedef struct array {
  int *data;
  size_t size;
} array;

void swap(array ary, int i, int j);
void assert_array_sorted(array ary);
void print_array(array ary);
void quicksort(array ary, int low, int high);

int main() {
  int i;

  // seed only once
  srand(time(NULL));

  array a1;
  a1.size = 5;

  a1.data = malloc(a1.size * sizeof(int));
  for (i = 0; i < a1.size; i++) {
    a1.data[i] = a1.size - i;
  }

  quicksort(a1, 0, a1.size - 1);
  assert_array_sorted(a1);

  a1.data[2] = 7;
  a1.data[0] = 70;
  quicksort(a1, 0, a1.size - 1);
  assert_array_sorted(a1);

  free(a1.data);

  return 0;
}

void quicksort(array ary, int low, int high) {
  int i, j, pivot, pivot_index;

  // Base case
  if (low >= high) {
    return;
  }

  // Define median element as pivot
  pivot_index = (rand() % (low - high)) + low;
  pivot = ary.data[pivot_index];

  // Take pivot out of the way
  swap(ary, pivot_index, low);

  // Initialize control indices for partition
  i = low + 1;
  j = low + 1;

  // Partitionate
  while (j <= high) {
    if (ary.data[j] < pivot) {
      // Swap
      swap(ary, i, j);
      i++;
    }

    j++;
  }

  // Put pivot back in its correct place
  pivot_index = i - 1;
  swap(ary, pivot_index, low);

  // Recurse into partitions
  // left
  quicksort(ary, low, pivot_index - 1);
  // right
  quicksort(ary, pivot_index + 1, high);
}

void swap(array ary, int i, int j) {
  int temp;

  temp = ary.data[i];
  ary.data[i] = ary.data[j];
  ary.data[j] = temp;
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
