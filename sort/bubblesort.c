#include <stdio.h>

void print_array(int *p, size_t size);
void bubblesort(int *p, size_t size);

int main() {
  int a[11] = { 9, 0, -78, 13, 4, 12, 0, 33, 4, -6, 123 };

  print_array(a, 11);
  bubblesort(a, 11);
  print_array(a, 11);

  return 0;
}

void print_array(int *p, size_t size) {
  int i = 0;
  printf("\nArray: ");
  for (; i < size; i++) {
    printf("%d ", p[i]);
  }
}

void bubblesort(int *p, size_t size) {
  
}

