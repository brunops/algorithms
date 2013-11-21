#include <stdio.h>

void bubblesort(int *p, size_t size);
void print_array(int *p, size_t size);

int main() {
  int a[13] = { 3, 2, 12, 4, 22, 32, 44, 444, 12, 65, 9, -2, -13 };

  print_array(a, 13);
  bubblesort(a, 13);
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

void bubblesort(int *p, size_t size) {
  int i, j, temp;

  for (i = 0; i < size; i++) {
    for (j = i + 1; j < size; ++j) {
      if (p[j] < p[i]) {
        temp = p[i];
        p[i] = p[j];
        p[j] = temp;
      }
    }
  }
}
