#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BITS_IN_A_BYTE 8

// Test functions
void assert_equals(int a, int b);
void assert_matrix_equals(int **m1, int **m2, int size);

// Debugging
void print_bits(int n);
void print_matrix(int **p, int size);


// Utility functions
int next_power_of_2(int number);
void allocate_matrix(int ***p, int size);

// Matrix calculations
void sum(int **m1, int **m2, int **result, int size);
void subtract(int **m1, int **m2, int **result, int size);
void multiply(int **m1, int **m2, int **result, int size);
