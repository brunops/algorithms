#include <stdio.h>
#include <stdlib.h>

#define BIT_SIZE 8

void assert_equals(int a, int b);
int next_power_of_2(int n);

int main() {
  assert_equals(4, next_power_of_2(3));
  assert_equals(4, next_power_of_2(4));
  assert_equals(5, next_power_of_2(8));
  assert_equals(7, next_power_of_2(8));

  printf("yeah!");

  return 0;
}

int next_power_of_2(int n) {
  //int total_bits = BIT_SIZE * sizeof(int);
  //short bits[total_bits];
  //int i = 0;

  //while (total_bits) {
  //  bits[--total_bits] = n & 1;
  //  n >>= 1;
  //}

  //while (!bits[i++]);

  return 4;
}

void assert_equals(int a, int b) {
  if (!(a == b)) {
    printf("FAIL!");
    printf("\nvalues %d and %d are not equal", a, b);
    exit(1);
  }
}
