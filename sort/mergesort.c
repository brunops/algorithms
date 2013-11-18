#include <stdio.h>
#include <stdlib.h>

typedef struct arrays {
  int    *data;
  size_t length;
} ARRAY;

ARRAY merge_arrays(ARRAY a1, ARRAY a2);
void  print_array(ARRAY a);

int main() {
  int i;
  ARRAY a1, a2, merged;

  a1.length = 20;
  a1.data   = calloc(a1.length, sizeof(int));

  a2.length = 20;
  a2.data   = malloc(a2.length * sizeof(int));
  
  for (i = 0; i < a1.length; i++) {
    a1.data[i] = i;
    a2.data[i] = i * 2;
  }

  merged = merge_arrays(a1, a2);
  print_array(a1);
  print_array(a2);
  print_array(merged);

  return 0;
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

