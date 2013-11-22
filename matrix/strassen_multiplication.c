#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BITS_IN_A_BYTE 8

void assert_equals(int a, int b);

void print_bits(int n);
void print_matrix(int **p, int size);
void allocate_matrix(int ***p, int size);

int next_power_of_2(int number);

int main(int argc, char *argv[]) {
  int i, **matrix;
  int size = next_power_of_2(5);
  allocate_matrix(&matrix, size);


  print_matrix(matrix, size);


  assert_equals(4, next_power_of_2(3));
  assert_equals(4, next_power_of_2(4));
  assert_equals(8, next_power_of_2(5));
  assert_equals(8, next_power_of_2(7));

  printf("yeah!");

  return 0;
}

int next_power_of_2(int number) {
  int total_bits = BITS_IN_A_BYTE * sizeof(int);
  short bits[total_bits];
  int i, ones = 0, result, highest_order_bit = 0, n = number;

  for (i = total_bits - 1; i >= 0; i--) {
    bits[i] = n & 1; // get leftmost bit as 1 is a mask for 000...0001
    n >>= 1;         // shift number so it's possible to get next left most bit

    if (bits[i]) {
      highest_order_bit = i;
      ones++;
    }
  }

  // If there is only one 1 in the bits of the number, then it is already a power of 2, return itself
  if (ones <= 1) {
    return number;
  }

  // Create next power of two with bitwise operations
  // Empty bits array, set as 1 only the number before highest_order_bit index
  // so it represents the next power of two binary
  // Recreate number from an array of short
  result = 0;
  memset(bits, 0, total_bits * sizeof(short));
  bits[highest_order_bit - 1] = 1;
  for (i = 0; i < total_bits; i++) {
    result <<= 1;
    result |= (int)bits[i];
  }

  return result;
}

void print_bits(int n) {
  int i, total_bits = BITS_IN_A_BYTE * sizeof(int);
  short bits[total_bits];

  printf("\nBits of %d are\n", n);
  for (i = total_bits - 1; i >= 0; i--) {
    bits[i] = n & 1;
    n >>= 1;
  }

  for (i = 0; i < total_bits; i++) {
    printf("%d", bits[i]);
  }
}

void assert_equals(int a, int b) {
  if (!(a == b)) {
    printf("FAIL!");
    printf("\nvalues %d and %d are not equal", a, b);
    exit(1);
  }
}

void print_matrix(int **p, int size) {
  int i, j;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      printf("%d ", p[i][j]);
    }
    printf("\n");
  }
}

/**
 * Allocate memory on the heap for square matrix of size size for pointer to pointer to pointer
 */
void allocate_matrix(int ***p, int size) {
  int i;

  *p = calloc(size, sizeof(int *));
  for (i = 0; i < size; i++) {
    (*p)[i] = calloc(size, sizeof(int));
  }
}
