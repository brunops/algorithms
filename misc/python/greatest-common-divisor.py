# Find the greatest common divisor of two positive integers.
# The integers can be large, so you need to find a clever solution.

# The inputs x and y are always greater or equal to 1, so the the greatest
# common divisor will always be an integer that is also greater or equal to 1.

def sieve(until):
  primes = [2]
  primes_index = { 2: 0 }

  sieve = [1] * until
  prime = 3
  prime_index = 1

  while prime < until:
    if sieve[prime]:
      primes.append(prime)
      primes_index[prime] = prime_index
      prime_index += 1
      temp = prime * 2
      while temp < until:
        sieve[temp] = 0
        temp += prime

    prime += 2


  return {
    'primes': primes,
    'primes_index': primes_index
  }

# globals are the wooooorst
prime_list = sieve(500000)
def next_prime(prime):
  prime_index = prime_list['primes_index'][prime]
  return prime_list['primes'][prime_index + 1]

def get_factors(n):
  factors = []

  prime = 2
  while n > 1:
    if n % prime == 0:
      factors.append(prime)
      n /= prime

    else:
      prime = next_prime(prime)

  return factors

def mygcd(x, y):
  factors_x = get_factors(x)
  factors_y = get_factors(y)

  x_i = 0
  y_i = 0

  x_factors_length = len(factors_x)
  y_factors_length = len(factors_y)

  gcd = 1

  while x_i < x_factors_length and y_i < y_factors_length:
    if factors_x[x_i] == factors_y[y_i]:
      gcd *= factors_x[x_i]
      x_i += 1
      y_i += 1
    elif factors_x[x_i] < factors_y[y_i]:
      x_i += 1
    else:
      y_i += 1

  return gcd


print mygcd(345, 345)
print mygcd(4, 8)



def mygcd2(x, y):
  if y == 0:
    return x

  return mygcd2(y, x % y)


print mygcd2(4, 8)
print mygcd2(8, 4)


