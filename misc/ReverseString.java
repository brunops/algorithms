class ReverseString {
  public static void main(String[] args) {
    System.out.println(reverse("hey bro"));
    System.out.println(reverse("a"));
    System.out.println(reverse("Madam, I'm Adam"));
  }

  static String reverse(String text) {
    int start = 0;
    int end = text.length() - 1;

    char[] txt = text.toCharArray();
    char temp;

    while (start < end) {
      temp = txt[start];
      txt[start] = txt[end];
      txt[end] = temp;

      start++;
      end--;
    }

    return new String(txt);
  }
}
