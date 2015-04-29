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

