; scheme miscellany from "The little Schemer"

; check if it's an atom
(define atom?
  (lambda (x)
    (and (not (pair? x)) (not (null? x)))))

(atom? '())      ; -> #f
(atom? 2)        ; -> #t
(atom? '3)       ; -> #t
(atom? '(1 2 3)) ; -> #f
(atom? '(1 2))   ; -> #f
(atom? 'aa)      ; -> #t

; check if given list is a list of atoms
(define lat?
  (lambda (l)
    (cond
      ((null? l) #t)
      ((atom? (car l)) (lat? (cdr l)))
      (else #f))))

(lat? '(1 2 3 4 5)) ; -> #t
(lat? '())          ; -> #t
(lat? '(() 1))      ; -> #f
(lat? '(1 2 3 ()))  ; -> #f

; check if `a` is a member of the list of atoms `lat`
(define member?
  (lambda (a lat)
    (cond
      ((null? lat) #f)
      ((eq? a (car lat)) #t)
      (else (member? a (cdr lat))))))

(member? 1 '(1 2 3))
(member? 2 '(1 2 3))
(member? 3 '(1 2 3))
(member? 1 '())

; remove first accurence of an element from a given list
(define rember
  (lambda (x l)
    (cond
      ((null? l) '())
      ((eq? x (car l)) (cdr l))
      (else (cons
              (car l) (rember x (cdr l)))))))

(rember 1 '(1 2 3)) ; -> '(2 3)
(rember 2 '(1 2 3)) ; -> '(1 3)
(rember 3 '(1 2 3)) ; -> '(1 2)
(rember 1 '())      ; -> '()
(rember 5 '(1 2 3)) ; -> '(1 2 3))
(rember 2 '(1 2 3 4 2 5)) ; -> '(1 3 4 2 5)

; takes a list of lists and returns another list composed of the first elements of each list
(define firsts
  (lambda (l)
    (cond
      ((null? l) '())
      (else (cons (car (car l)) (firsts (cdr l)))))))

(firsts '( (1 2 3) (2 3 4) (3 4 5) )) ; -> (1 2 3)
(firsts '( ((1 2) 3) ((4 5) 6) (7) )) ; ->  ((1 2) (4 5) 7)

; insert `new` item after first occurence of `old` item in `lat`
(define insertR
  (lambda (new old lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) old) (cons old (cons new (cdr lat))))
      (else (cons (car lat) (insertR new old (cdr lat)))))))

(insertR 'ho 'hey '(hey lets go))    ; -> (hey ho lets go)
(insertR 'foo 'nothere '(sup))       ; -> (sup)
(insertR 'bar 'foobar '(foo foobar)) ; -> (foo foobar bar)
(insertR 'bar 'foobar '(foo foobar foobar)) ; -> (foo foobar bar foobar)

; insert `new` to the left of `old` in `lat`
(define insertL
  (lambda (new old lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) old) (cons new lat))
      (else (cons (car lat) (insertL new old (cdr lat)))))))

(insertL 'hey 'ho '(ho lets go))    ; -> (hey ho lets go)
(insertL 'foo 'nothere '(sup))       ; -> (sup)
(insertL 'bar 'foobar '(foo foobar)) ; -> (foo bar foobar)
(insertL 'bar 'foobar '(foo foobar foobar)) ; -> (foo bar foobar foobar)

; substitutes `old` with `new` in list `lat`
(define subst
  (lambda (new old lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) old) (cons new (cdr lat)))
      (else (cons (car lat) (subst new old (cdr lat)))))))

(subst 'hey 'bla '(bla ho lets go)) ; -> (hey ho lets go)
(subst 'zz 'bla '(bla top)) ; -> (zz top)
(subst 'zzz 'asd '(nothing)) ; -> (nothing)

; substitutes first occurence of `str1` or `str2` by `new`
(define subst2
  (lambda (new str1 str2 lat)
    (cond
      ((null? lat) '())
      ((or (eq? str1 (car lat)) (eq? str2 (car lat))) (cons new (cdr lat)))
      (else (cons (car lat) (subst2 new str1 str2 (cdr lat)))))))

(subst2 'neew 'first 'second '(first second third)) ; -> (neew second third)
(subst2 'neew 'first 'second '(second third))       ; -> (neew third)
(subst2 'neew 'first 'second '(bla first first second)) ; -> (bla neew first second)
(subst2 'neew 'bla 'ble '(bli blo blu)) ; -> (bli blo blu)

; removes all occurences of `x` from `lat`
(define multirember
  (lambda (x lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) x) (multirember x (cdr lat)))
      (else (cons (car lat) (multirember x (cdr lat)))))))

(multirember 'gone '(first second gone third)) ; -> (first second third)
(multirember 'gone '(first gone second gone third gone)) ; -> (first second third)

; insert `new` to the right of all `old` occurences in `lat`
(define multiinsertR
  (lambda (new old lat)
    (cond
      ((null? lat) '())
      ((eq? (car lat) old) (cons old (cons new (multiinsertR new old (cdr lat)))))
      (else (cons (car lat) (multiinsertR new old (cdr lat)))))))

(multiinsertR 'bar 'foo '(foo hey foo hey foo foo)) ; -> (foo bar hey foo bar hey foo bar foo bar)
(multiinsertR 'bar 'foo '()) ; -> ()
(multiinsertR 'bar 'foo '(foo)) ; -> (foo bar)
(multiinsertR 'bar 'foo '(bar)) ; -> (bar)


; prints factorials
(define factorial
  (lambda (x)
    (cond 
      ((<= x 1) 1)
      (else (* x (factorial (- x 1)))))))

(factorial 0) ; -> 1
(factorial 1) ; -> 1
(factorial 2) ; -> 2
(factorial 3) ; -> 6
(factorial 4) ; -> 24
(factorial 5) ; -> 120
(factorial 6) ; -> 720 


; add 1 to `x`
(define add1
  (lambda (x)
    (+ x 1)))

(add1 5) ; -> 6
(add1 0) ; -> 1

; subtracts 1 from `x`
(define sub1
  (lambda (x)
    (- x 1)))

(sub1 5) ; -> 4
(sub1 1) ; -> 0

; add `m` to `n`
(define o+
  (lambda (m n)
    (cond
      ((zero? n) m)
      (else (add1 (o+ m (sub1 n)))))))

(o+ 5 5) ; -> 10
(o+ 0 5) ; -> 5
(o+ 1 7) ; -> 8

; substracts `n` from `m`
(define o-
  (lambda (m n)
    (cond
      ((zero? n) m)
      (else (sub1 (o- m (sub1 n)))))))

(o- 5 5) ; -> 0
(o- 4 2) ; -> 2
(o- 7 1) ; -> 6

; fibonacci
(define fib
  (lambda (x)
    (cond
      ((<= x 1) x)
      (else (+ (fib (- x 1)) (fib (- x 2)))))))

(fib 0)
(fib 1)
(fib 2)
(fib 3)
(fib 4)
(fib 5)
(fib 6)
(fib 20)

; multiply `n` by `m`
(define x
  (lambda (n m)
    (cond
      ((zero? m) 0)
      (else (o+ n (x n (sub1 m)))))))

(x 5 4) ; -> 20
(x 3 0) ; -> 0
(x 1 5) ; -> 5
(x 13 7) ; -> 91

; add two tuples
(define tup+
  (lambda (tup1 tup2)
    (cond
      ((null? tup1) tup2)
      ((null? tup2) tup1)
      (else (cons (+ (car tup1) (car tup2)) (tup+ (cdr tup1) (cdr tup2)))))))

(tup+ '(1 2 3 4 5) '(5 4 3 2 1)) ; -> (6 6 6 6 6)
(tup+ '(1 2) '(54 100)) ; -> (55 102)
(tup+ '(1) '(2)) ; -> (3)
(tup+ '(1 5) '(2)) ; -> (3 5)
(tup+ '(1 5) '(2 6 7 12 55)) ; -> (3 11 7 12 55)

; return if `n` is less than `m`
(define o<
  (lambda (n m)
    (cond
      ((zero? m) #f)
      ((zero? n) #t)
      (else (o< (sub1 n) (sub1 m))))))

(o< 3 4) ; -> #t
(o< 5 3) ; -> #f
(o< 2 2) ; -> #f

; return if `n` is greater than `m`
(define o>
  (lambda (n m)
    (cond
      ((zero? n) #f)
      ((zero? m) #t)
      (else (o> (sub1 n) (sub1 m))))))

(o> 4 3) ; -> #t
(o> 3 5) ; -> #f
(o> 2 2) ; -> #f

; return if `n` is equal to `m`
(define o=
  (lambda (n m)
    (cond
      ((o> n m) #f)
      ((o< n m) #f)
      (else #t))))

(o= 4 3) ; -> #f
(o= 3 5) ; -> #f
(o= 2 2) ; -> #t

; return quotient
(define o/
  (lambda (n m)
    (cond
      ((o< n m) 0)
      (else (add1 (o/ (o- n m) m))))))

(o/ 4 2) ; -> 2
(o/ 5 3) ; -> 1
(o/ 128 2) ; -> 64
(o/ 5 10) ; -> 0

; return item `n` from list `lat`, starts with 1
(define pick
  (lambda (n lat)
    (cond
      ((zero? (sub1 n)) (car lat))
      (else (pick (sub1 n) (cdr lat))))))

(pick 1 '(5 10 7)) ; -> 5
(pick 2 '(7 6)) ; -> 6
(pick 3 '(1 2 3)) ; -> 3
(pick 2 '(5 (2 2) 3)) ; -> (2 2)

; return a list without item `n` from list `lat`, starts with 1
(define rempick
  (lambda (n lat)
    (cond
      ((zero? (sub1 n)) (cdr lat))
      (else (cons (car lat) (rempick (sub1 n) (cdr lat)))))))

(rempick 1 '(5 10 30)) ; -> (10 30)
(rempick 2 '(1 2 3)) ; -> (1 3)
(rempick 1 '(1)) ; -> ()
(rempick 3 '(1 2 3 4 5)) ; -> (1 2 4 5)

; removes all numbers from a list an returns the other elements
(define no-nums
  (lambda (lat)
    (cond
      ((null? lat) '())
      ((number? (car lat)) (no-nums (cdr lat)))
      (else (cons (car lat) (no-nums (cdr lat)))))))

(no-nums '(1)) ; -> ()
(no-nums '(a b c)) ; -> (a b c)
(no-nums '(1 a b)) ; -> (a b)
(no-nums '(1 a 2 b 3 c)) ; -> (a b c)
(no-nums '(a 1 b 2 c 3)) ; -> (a b c)

; removes all non number elements from a list and returns a list only with numbers
(define all-nums
  (lambda (lat)
    (cond
      ((null? lat) '())
      ((not (number? (car lat))) (all-nums (cdr lat)))
      (else (cons (car lat) (all-nums (cdr lat)))))))

(all-nums '(1)) ; -> (1)
(all-nums '(a b c)) ; -> ()
(all-nums '(1 a b)) ; -> (1)
(all-nums '(1 a 2 b 3 c)) ; -> (1 2 3)
(all-nums '(a 1 b 2 c 3)) ; -> (1 2 3)

; Returns true if `a1` and `a2` atoms are the same
(define eqan?
  (lambda (a1 a2)
    (cond
      ((and (number? a1) (number? a2)) (= a1 a2))
      ((or (number? a1) (number? a2)) #f)
      (else (eq? a1 a2)))))

(eqan? 1 1) ; -> #t
(eqan? 1 2) ; -> #f
(eqan? 1 'a) ; -> #f
(eqan? 'a 'a) ; -> #t
(eqan? 'a 'b) ; -> #f

; Counts how many times atom `a` occurs in `lat`
(define occur
  (lambda (a lat)
    (cond
      ((null? lat) 0)
      ((eqan? a (car lat)) (add1 (occur a (cdr lat))))
      (else (occur a (cdr lat))))))

(occur 'a '(1 2 3)) ; -> 0
(occur 1 '(1 2 3)) ; -> 1
(occur 1 '(1 2 1 3)) ; -> 2
(occur 'a '(1 a 2 a 3 a)) ; -> 3
              
; return #t if `n` is 1 and #f otherwise
(define one?
  (lambda (n)
    (eqan? n 1)))

(one? 1) ; -> #t
(one? 0) ; -> #f
(one? 2) ; -> #f
(one? '(1)) ; -> #f
(one? 'a) ; -> #f

; return a list without item `n` from list `lat`, starts with 1 - using `one?`
(define rempick2
  (lambda (n lat)
    (cond
      ((one? n) (cdr lat))
      (else (cons (car lat) (rempick2 (sub1 n) (cdr lat)))))))

(rempick2 1 '(5 10 30)) ; -> (10 30)
(rempick2 2 '(1 2 3)) ; -> (1 3)
(rempick2 1 '(1)) ; -> ()
(rempick2 3 '(1 2 3 4 5)) ; -> (1 2 4 5)


















