#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BITS_IN_A_BYTE 8

void assert_equals(int a, int b);

void print_bits(int n);
void print_matrix(int **p, int size);
void allocate_matrix(int ***p, int size);

int next_power_of_2(int number);

