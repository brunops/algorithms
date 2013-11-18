#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct arrays {
  int    *data;
  size_t length;
} ARRAY;

ARRAY merge_sort(ARRAY a);
ARRAY merge_arrays(ARRAY a1, ARRAY a2);
void  print_array(ARRAY a);

int main() {
  int i;
  ARRAY a1;

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
 * Receive unordered ARRAY and return ordered ARRAY using mergesort algorithm
 *
 * return sorted ARRAY
 */
ARRAY merge_sort(ARRAY a) {
  ARRAY left, right;

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

  return merge_arrays(left, right);  
}

/**
 * Receive two sorted ARRAYs a1 and a2 and merge them together as a sorted ARRAY
 * 
 * return sorted ARRAY
 */
ARRAY merge_arrays(ARRAY a1, ARRAY a2) {
  int i, head1 = 0, head2 = 0, merged_head = 0;
  ARRAY merged_array;

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

void print_array(ARRAY a) {
  int i;

  printf("\nArray data is: ");
  for (i = 0; i < a.length; ++i) {
    printf("%d ", a.data[i]);
  }
}

