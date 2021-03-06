#include "strassen_multiplication.h"

int main(int argc, char *argv[]) {
  int i, j, k, size = 8;
  int **m1, **m2, **result, **strassen_result, **expected_sum, **expected_subtraction, **expected_multiplication;

  m1 = allocate_matrix(size);
  m2 = allocate_matrix(size);
  expected_sum = allocate_matrix(size);
  expected_subtraction = allocate_matrix(size);
  expected_multiplication = allocate_matrix(size);
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      m1[i][j] = j;
      m2[i][j] = j;
      expected_sum[i][j] = 2 * j;
      expected_subtraction[i][j] = 0;
    }
  }

  result = allocate_matrix(size);
  sum(m1, m2, result, size);
  assert_matrix_equals(result, expected_sum, size);

  subtract(m1, m2, result, size);
  assert_matrix_equals(result, expected_subtraction, size);

  strassen_result = allocate_matrix(size);
  multiply(m1, m2, result, size);
  strassen(m1, m2, strassen_result, size);
  assert_matrix_equals(result, strassen_result, size);

  size = next_power_of_2(5);

  assert_equals(4, next_power_of_2(3));
  assert_equals(4, next_power_of_2(4));
  assert_equals(8, next_power_of_2(5));
  assert_equals(8, next_power_of_2(7));


  printf("yeah!");

  return 0;
}

void strassen(int **m1, int **m2, int **result, int size) {
  int i, j;
  int **m1_copy, **m2_copy, **result_copy;
  printf("STRASSEN!\n");
  printf("\n\nmatrix 1\n");
  print_matrix(m1, size);
  printf("\n\nmatrix 2\n");
  print_matrix(m2, size);

  // Actual matrix size needed for the recursive calls
  int new_size = next_power_of_2(size);
  if (new_size != size) {

    m1_copy = allocate_matrix(new_size);
    m2_copy = allocate_matrix(new_size);
    result_copy = allocate_matrix(new_size);
    for (i = 0; i < size; i++) {
      for (j = 0; j < size; j++) {
        m1_copy[i][j] = m1[i][j];
        m2_copy[i][j] = m2[i][j];
      }
    }

    strassen_recursive(m1_copy, m2_copy, result_copy, new_size);

    for (i = 0; i < size; i++) {
      for (j = 0; j < size; j++) {
        result[i][j] = result_copy[i][j];
      }
    }

    free(m1_copy);
    free(m2_copy);
    free(result_copy);
  }
  else {
    strassen_recursive(m1, m2, result, new_size);
  }


  printf("\n\nresulting matrix\n");
  print_matrix(result, size);
}

/**
 *
 *
 * Submatrices are defined as follows:
 *  m1 = [
 *    [A, B],
 *    [C, D]
 *  ]
 *
 *  m2 = [
 *    [E, F],
 *    [G, H]
 *  ]
 */
void strassen_recursive(int **m1, int **m2, int **result, int size) {
  int i, j, new_size;
  int **A, **B, **C, **D,
      **E, **F, **G, **H,
      **P1, **P2, **P3, **P4, **P5, **P6, **P7,
      **R1, **R2, **R3, **R4,
      **left, **right;

  // base case
  if (size == 1) {
    multiply(m1, m2, result, size);
    return;
  }
  else {
    new_size = size / 2;

    // Allocate memory for all 8 sub matrices
    // m1
    A = allocate_matrix(new_size);
    B = allocate_matrix(new_size);
    C = allocate_matrix(new_size);
    D = allocate_matrix(new_size);
    // m2
    E = allocate_matrix(new_size);
    F = allocate_matrix(new_size);
    G = allocate_matrix(new_size);
    H = allocate_matrix(new_size);

    for (i = 0; i < new_size; i++) {
      for (j = 0; j < new_size; ++j) {
        A[i][j] = m1[i][j];
        B[i][j] = m1[i][j + new_size];
        C[i][j] = m1[i + new_size][j];
        D[i][j] = m1[i + new_size][j + new_size];

        E[i][j] = m2[i][j];
        F[i][j] = m2[i][j + new_size];
        G[i][j] = m2[i + new_size][j];
        H[i][j] = m2[i + new_size][j + new_size];
      }
    }

    // Allocate memory for products (P's in Strassen's algorithm)
    P1 = allocate_matrix(new_size);
    P2 = allocate_matrix(new_size);
    P3 = allocate_matrix(new_size);
    P4 = allocate_matrix(new_size);
    P5 = allocate_matrix(new_size);
    P6 = allocate_matrix(new_size);
    P7 = allocate_matrix(new_size);

    // Allocate memory for left and right temp results
    left = allocate_matrix(new_size);
    right = allocate_matrix(new_size);

    // Allocate memory for results
    R1 = allocate_matrix(new_size);
    R2 = allocate_matrix(new_size);
    R3 = allocate_matrix(new_size);
    R4 = allocate_matrix(new_size);

    // Calculate products
    // P1 = A (F - H)
    subtract(F, H, right, new_size);
    strassen_recursive(A, right, P1, new_size);

    // P2 = (A + B) H
    sum(A, B, left, new_size);
    strassen_recursive(left, H, P2, new_size);

    // P3 = (C + D) E
    sum(C, D, left, new_size);
    strassen_recursive(left, E, P3, new_size);

    // P4 = D (G - E)
    subtract(G, E, right, new_size);
    strassen_recursive(D, right, P4, new_size);

    // P5 = (A + D) (E + H)
    sum(A, D, left, new_size);
    sum(E, H, right, new_size);
    strassen_recursive(left, right, P5, new_size);

    // P6 = (B - D) (G + H)
    subtract(B, D, left, new_size);
    sum(G, H, right, new_size);
    strassen_recursive(left, right, P6, new_size);

    // P7 = (A - C) (E + F)
    subtract(A, C, left, new_size);
    sum(E, F, right, new_size);
    strassen_recursive(left, right, P7, new_size);

    // Calculate result, such that:
    // m1 . m2 = [
    //   [R1, R2],
    //   [R3, R4]
    // ]
    // R1 = P5 + P4 - P2 + P6
    sum(P5, P4, R1, new_size);
    subtract(R1, P2, R1, new_size);
    sum(R1, P6, R1, new_size);

    // R2 = P1 + P2
    sum(P1, P2, R2, new_size);

    // R3 = P3 + P4
    sum(P3, P4, R3, new_size);

    // R4 = P1 + P5 - P3 - P7
    sum(P1, P5, R4, new_size);
    subtract(R4, P3, R4, new_size);
    subtract(R4, P7, R4, new_size);

    // Group everything into the result
    for (i = 0; i < new_size; i++) {
      for (j = 0; j < new_size; j++) {
        result[i][j] = R1[i][j];
        result[i][j + new_size] = R2[i][j];
        result[i + new_size][j] = R3[i][j];
        result[i + new_size][j + new_size] = R4[i][j];
      }
    }

    // Deallocate memory of all P's and results
    deallocate_matrix(P1, new_size);
    deallocate_matrix(P2, new_size);
    deallocate_matrix(P3, new_size);
    deallocate_matrix(P4, new_size);
    deallocate_matrix(P5, new_size);
    deallocate_matrix(P6, new_size);
    deallocate_matrix(P7, new_size);
    deallocate_matrix(R1, new_size);
    deallocate_matrix(R2, new_size);
    deallocate_matrix(R3, new_size);
    deallocate_matrix(R4, new_size);
    deallocate_matrix(left, new_size);
    deallocate_matrix(right, new_size);
  }
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
  printf("\n");
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
int **allocate_matrix(int size) {
  int i, **p;

  p = calloc(size, sizeof(int *));
  for (i = 0; i < size; i++) {
    p[i] = calloc(size, sizeof(int));
  }

  return p;
}

void deallocate_matrix(int **p, int size) {
  int i;
  for (i = 0; i < size; ++i) {
    free(p[i]); // deallocate row
  }
  free(p); // deallocate pointers to rows
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
      result[i][j] += 0;
      for (k = 0; k < size; k++) {
        result[i][j] += m1[i][k] * m2[k][j];
      }
    }
  }
}
