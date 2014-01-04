def assert(truthiness)
  raise "fail" unless truthiness
end

def check_braces(expression)
  braces = {
    '[' => ']',
    '(' => ')',
    '{' => '}'
  }

  stack = []
  expression.gsub! /\s/, ''

  expression.split(//).each do |char|
    if braces.has_key? char
      stack << char
    elsif braces[stack.pop] != char
      return false
    end
  end

  stack.empty?
end

assert(check_braces("(") == false)
assert(check_braces("()") == true)
assert(check_braces("[](") == false)
assert(check_braces("{()}") == true)
assert(check_braces("{((((([()])))))}") == true)
assert(check_braces("{ ( ((((  [(  )]) ) ) )   )}") == true)
assert(check_braces("{ ( } )") == false)
assert(check_braces("{ ( []) }") == true)
assert(check_braces("[[{ ( []) }]]") == true)
assert(check_braces("[[{ ( []) }]]((())) {} {} [][] [[]]") == true)

puts "success!"
