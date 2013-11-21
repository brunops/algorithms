#include <stdio.h>

void selectionsort(int *p, size_t size);
void print_array(int *p, size_t size);

int main() {
  int a[13] = { 3, 2, 12, 4, 22, 32, 44, 444, 12, 65, 9, -2, -13 };

  print_array(a, 13);
  selectionsort(a, 13);
  print_array(a, 13);

  return 0;
}

void print_array(int *p, size_t size) {
  int i;
  printf("\nArray is: ");
  for (i = 0; i < size; ++i) {
    printf("%d ", p[i]);
  }
}

void selectionsort(int *p, size_t size) {
  int i, j, temp, min_index;

  for (i = 0; i < size; i++) {
    min_index = i;
    for (j = i + 1; j < size; ++j) {
      if (p[j] < p[i]) {
        min_index = j;   
      }
    }

    temp = p[i];
    p[i] = p[min_index];
    p[min_index] = temp;
  }
}
