#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct array {
  int    *data;
  size_t length;
} array;

array merge_sort(array a);
array merge_arrays(array a1, array a2);
void  print_array(array a);

int main() {
  int i;
  array a1;

  a1.length = 20;
  a1.data   = malloc(a1.length * sizeof(int));

  for (i = 0; i < a1.length; i++) {
    a1.data[i] = i;
  }

  a1.data[5] = 345;
  a1.data[2] = 11;
  a1.data[14] = 20;
  a1.data[18] = 37;
  a1.data[7] = 0;

  print_array(a1);
  print_array(merge_sort(a1));

  return 0;
}

/**
 * Receive unordered array and return ordered array using mergesort algorithm
 *
 * return sorted array
 */
array merge_sort(array a) {
  array left, right, merged_array;

  if (a.length == 1) {
    return a;
  }

  left.length = a.length / 2;
  left.data = malloc(left.length * sizeof(int));
  memcpy(left.data, a.data, left.length * sizeof(int));
  left = merge_sort(left);

  right.length = a.length - left.length;
  right.data = malloc(right.length * sizeof(int));
  memcpy(right.data, &a.data[left.length], right.length * sizeof(int));
  right = merge_sort(right);

  merged_array = merge_arrays(left, right);

  free(left.data);
  free(right.data);

  return merged_array;
}

/**
 * Receive two sorted arrays a1 and a2 and merge them together as a sorted array
 *
 * return sorted array
 */
array merge_arrays(array a1, array a2) {
  int i, head1 = 0, head2 = 0, merged_head = 0;
  array merged_array;

  merged_array.length = a1.length + a2.length;
  merged_array.data   = malloc(merged_array.length * sizeof(int));

  while (head1 < a1.length || head2 < a2.length) {
    if (head1 < a1.length && head2 < a2.length) {
      merged_array.data[merged_head++] = a1.data[head1] <= a2.data[head2] ? a1.data[head1++] : a2.data[head2++];
    }
    else if (head1 < a1.length) {
      merged_array.data[merged_head++] = a1.data[head1++];
    }
    else {
      merged_array.data[merged_head++] = a2.data[head2++];
    }
  }

  return merged_array;
}

void print_array(array a) {
  int i;

  printf("\nArray data is: ");
  for (i = 0; i < a.length; ++i) {
    printf("%d ", a.data[i]);
  }
}

