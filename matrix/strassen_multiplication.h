#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BITS_IN_A_BYTE 8

// Strassen's algorithm
void strassen(int **m1, int **m2, int **result, int size);
void strassen_recursive(int **m1, int **m2, int **result, int size);
void resize_matrix(int ***matrix, int current_size, int desired_size);

// Test functions
void assert_equals(int a, int b);
void assert_matrix_equals(int **m1, int **m2, int size);

// Debugging
void print_bits(int n);
void print_matrix(int **p, int size);


// Utility functions
int next_power_of_2(int number);
int **allocate_matrix(int size);
void deallocate_matrix(int **p, int size);

// Matrix calculations
void sum(int **m1, int **m2, int **result, int size);
void subtract(int **m1, int **m2, int **result, int size);
void multiply(int **m1, int **m2, int **result, int size);
