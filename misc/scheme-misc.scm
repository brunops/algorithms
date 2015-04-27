; scheme miscellany from "The little Schemer"

; check if it's an atom
(define atom?
  (lambda (x)
    (and (not (pair? x)) (not (null? x)))))

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



