import java.util.Arrays;

class BinaryCode {

  public static void main(String[] args) {
    System.out.println("sup");
    System.out.println(Arrays.deepToString(decode("22111")));
    System.out.println("bro");
  }

  public static String[] decode(String message) {
    char[] msg = message.toCharArray();
    String[] decodedStrings = new String[2];
    int[][] decodedValues = { new int[msg.length], new int[msg.length] };

    if (msg.length == 1) {
      int value = Character.getNumericValue(msg[0]);
      if (value < 0 || value > 1) {
        decodedStrings[0] = "NONE";
        decodedStrings[1] = "NONE";
        return decodedStrings;
      }
    }

    for (int guess = 0; guess < 2; guess++) {
      decodedValues[guess][0] = guess;

      int i = 0;
      while (i < msg.length - 1) {
        int prev = 0;

        // previous value
        if (i > 0) {
          prev = decodedValues[guess][i - 1];
        }

        decodedValues[guess][i + 1] = Character.getNumericValue(msg[i]) - decodedValues[guess][i] - prev;

        if (decodedValues[guess][i + 1] < 0 || decodedValues[guess][i + 1] > 1) {
          decodedStrings[guess] = "NONE";
          break;
        }

        i++;
      }

      if (i == msg.length - 1) {
        StringBuilder builder = new StringBuilder();
        for (int n : decodedValues[guess]) {
          builder.append(n);
        }
        decodedStrings[guess] = builder.toString();
      }
    }

    return decodedStrings;
  }
}
