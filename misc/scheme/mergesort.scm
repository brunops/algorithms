; returns a merged sorted list assuming `lat1` and `lat2` are already sorted
(define merge
  (lambda (lat1 lat2)
    (cond
      ((null? lat1) lat2)
      ((null? lat2) lat1)
      ((<= (car lat1) (car lat2)) (cons (car lat1) (merge (cdr lat1) lat2)))
      (else (cons (car lat2) (merge lat1 (cdr lat2)))))))

(merge '(2 7 19) '(4 12 56 78 99)) ; -> (2 4 7 12 19 56 78 99)

; returns a list from `start` index of `size` elements
(define slice
  (lambda (lat start size)
    (cond
      ((null? lat) '())
      ((and (zero? start) (zero? size)) '())
      ((not (zero? start)) (slice (cdr lat) (- start 1) size))
      (else (cons (car lat) (slice (cdr lat) 0 (- size 1)))))))

(slice '(1 2 3) 0 2)                ; -> (1 2)
(slice '(1 2 3 4 5 6) 2 3)          ; -> (3 4 5)
(slice '(1 2 3 4 5 6 7 8 9) 3 7)    ; -> (4 5 6 7 8 9)
(slice '(1 2 3 4 5 6 7 8 9 10) 3 7) ; -> (4 5 6 7 8 9 10)
(slice '(1 2 3) 0 0)                ; -> ()
(slice '(1 2 3) 0 3)                ; -> (1 2 3)

; return the length of a list
(define len
  (lambda (lat)
    (cond
      ((null? lat) 0)
      (else (+ 1 (len (cdr lat)))))))

(len '())             ; -> 0
(len '(1))            ; -> 1
(len '(1 2))          ; -> 2
(len '(1 2 3))        ; -> 3
(len '(1 2 3 3 3 3))  ; -> 6

; sorts a list `lat`
(define mergesort
  (lambda (lat)
    (cond
      ((null? lat) '())
      ((eq? (len lat) 1) lat)
      (else (merge
              (mergesort (slice lat 0 (quotient (len lat) 2)))
              (mergesort (slice lat (quotient (len lat) 2) (len lat))))))))

(mergesort '(4 3 6))                              ; -> (3 4 6)
(mergesort '(4 3 63 89 99 100 122 88 4 5 1 0 -2)) ; -> (-2 0 1 3 4 4 5 63 88 89 99 100 122)
(mergesort '(4 23 13 116))                        ; -> (4 13 23 116)
