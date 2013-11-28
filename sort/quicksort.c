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
