#include <stdio.h>

#define ARRAY_SIZE 15

void insertionsort(int *array, int n);

int main() {
  int i;
  int array[ARRAY_SIZE] = { 2, 5, 7, 33, 9, 12, 44, 10, 10, -3, 55, 123, 0, -7, 50 };

  insertionsort(array, ARRAY_SIZE);

  for (i = 0; i < ARRAY_SIZE; ++i) {
    printf("%d ", array[i]);
  }

  return 0;
}

void insertionsort(int *array, int n) {
  int i, j, temp;

  for (i = 1; i < n; ++i) {
    j = i;
    while ((j > 0) && (array[j] < array[j - 1])) {
      temp = array[j];
      array[j] = array[j - 1];
      array[j - 1] = temp;
      j--;
    }
  }

  return;
}

