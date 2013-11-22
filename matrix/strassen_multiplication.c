#include "strassen_multiplication.h"

int main(int argc, char *argv[]) {
  int i, j, k, **matrix, size = 3;
  int **m1, **m2, **result, **expected_sum, **expected_subtraction, **expected_multiplication;

  allocate_matrix(&m1, size);
  allocate_matrix(&m2, size);
  allocate_matrix(&expected_sum, size);
  allocate_matrix(&expected_subtraction, size);
  allocate_matrix(&expected_multiplication, size);
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      m1[i][j] = j;
      m2[i][j] = j;
      expected_sum[i][j] = 2 * j;
      expected_subtraction[i][j] = 0;
      for (k = 0; k < size; k++) {
        expected_multiplication[i][j] += m1[i][k] * m2[k][j];
      }
    }
  }

  allocate_matrix(&result, size);
  sum(m1, m2, result, size);
  assert_matrix_equals(result, expected_sum, size);

  subtract(m1, m2, result, size);
  assert_matrix_equals(result, expected_subtraction, size);

  size = next_power_of_2(5);
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

void assert_matrix_equals(int **m1, int **m2, int size) {
  int i, j;
  for (i = 0; i < size; ++i) {
    for (j = 0; j < size; ++j) {
      if (m1[i][j] != m2[i][j]) {
        printf("FAIL!");
        printf("\nvalues on position [%d][%d]: are different! m1 => %d, m2 => %d", i, j, m1[i][j], m2[i][j]);
        exit(1);
      }
    }
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

void sum(int **m1, int **m2, int **result, int size) {
  int i, j;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      result[i][j] = m1[i][j] + m2[i][j];
    }
  }
}

void subtract(int **m1, int **m2, int **result, int size) {
  int i, j;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      result[i][j] = m1[i][j] - m2[i][j];
    }
  }
}

void multiply(int **m1, int **m2, int **result, int size) {
  int i, j, k;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      for (k = 0; k < size; k++) {
        result[i][j] += m1[i][k] + m2[k][j];
      }
    }
  }
}


