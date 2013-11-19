#include <stdio.h>

void insertion_sort(int *p, size_t size);
void print_array(int *p, size_t size);

int main() {
  int a[5] = { 5, 10, 2, -7, 40 };

  print_array(a, 5);
  insertion_sort(a, 5);
  print_array(a, 5);

  return 0;
}

void insertion_sort(int *p, size_t size) {
  int i, j, key;

  for (i = 1; i < size; i++) {
    key = p[i];
    j = i - 1;
    while (j >= 0 && p[j] > key) {
      p[j + 1] = p[j];
      j--;
    }

    p[j + 1] = key;
  }
}

void print_array(int *p, size_t size) {
  int i;

  printf("\nArray is: ");
  for (i = 0; i < size; i++) {
    printf("%d ", p[i]);
  }
}
