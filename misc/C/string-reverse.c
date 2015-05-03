#include <stdio.h>
#include <string.h>

void string_reverse(char *str);

int main() {
  char string1[] = "hello",
       string2[] = "hell";

  printf("string1: %s\n", string1);
  printf("string2: %s\n", string2);

  string_reverse(string1);
  string_reverse(string2);

  printf("\nreversed: %s", string1);
  printf("\nreversed: %s", string2);

  return 0;
}

void string_reverse(char *str) {
  int i, len;
  char temp;

  len = strlen(str);
  
  for (i = 0; i < len / 2; ++i) {
    temp = str[i];
    str[i] = str[len - i - 1];
    str[len - i - 1] = temp;
  }
}
